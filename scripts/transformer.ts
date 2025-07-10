import * as ts from 'typescript';

export function customTransformer(): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            // Lưu trữ thông tin exceptions cho mỗi phương thức trong class
            const methodExceptions = new Map<string, { [key: string]: ts.Identifier }>();
            // Lưu trữ thông tin function calls trong method
            const methodFunctionCalls = new Map<string, { [key: string]: ts.Identifier }>();

            // Hàm helper để thu thập throw new Error hoặc class lỗi tùy chỉnh
            function collectExceptions(node: ts.Node, methodKey: string | undefined) {
                if (
                    ts.isThrowStatement(node) &&
                    ts.isNewExpression(node.expression) &&
                    ts.isIdentifier(node.expression.expression) &&
                    node.expression.expression.text.includes('Error') // Chỉ lấy các class lỗi (như Error, TypeError, CustomError)
                ) {
                    const errorClass = node.expression.expression;
                    if (methodKey) {
                        if (!methodExceptions.has(methodKey)) {
                            methodExceptions.set(methodKey, {});
                        }
                        if (!methodExceptions.get(methodKey)![errorClass.text])
                            methodExceptions.get(methodKey)![errorClass.text] = errorClass
                    }
                }

                // Thu thập function calls
                if (
                    ts.isCallExpression(node) &&
                    ts.isIdentifier(node.expression) &&
                    methodKey
                ) {
                    const functionName = node.expression.text;
                    const functionIdentifier = node.expression;
                    if (!methodFunctionCalls.has(methodKey)) {
                        methodFunctionCalls.set(methodKey, {});
                    }
                    if (!methodFunctionCalls.get(methodKey)![functionName])
                        methodFunctionCalls.get(methodKey)![functionName] = functionIdentifier;
                }

                ts.forEachChild(node, (child) => collectExceptions(child, methodKey));
            }

            // Hàm visitor để phân tích các phương thức trong class
            function visitor(node: ts.Node): ts.Node {
                if (ts.isClassDeclaration(node)) {
                    // Duyệt qua các thành viên của class
                    const updatedMembers = node.members.map((member) => {
                        if (ts.isMethodDeclaration(member) && member.name) {
                            const methodName = member.name.getText();
                            const methodKey = `${node.name?.text || 'AnonymousClass'}.${methodName}`;

                            // Thu thập exceptions trong phương thức
                            ts.forEachChild(member, (child) => collectExceptions(child, methodKey));

                            // Lấy exceptions trực tiếp từ method
                            const directExceptions = methodExceptions.get(methodKey);
                            const functionCalls = methodFunctionCalls.get(methodKey);

                            // Tạo array expression với format: [Error, ...(fn.exception || [])]
                            let exceptionArrayElements: ts.Expression[] = [];

                            // Thêm exceptions trực tiếp từ method
                            if (directExceptions && Object.keys(directExceptions).length > 0) {
                                exceptionArrayElements.push(...Object.values(directExceptions));
                            }

                            // Thêm exceptions từ function calls với spread syntax
                            if (functionCalls && Object.keys(functionCalls).length > 0) {
                                Object.entries(functionCalls).forEach(([funcName, funcIdentifier]) => {
                                    // Tạo expression: ...(fn.exception || [])
                                    const spreadExpression = ts.factory.createSpreadElement(
                                        ts.factory.createBinaryExpression(
                                            ts.factory.createPropertyAccessExpression(
                                                funcIdentifier,
                                                ts.factory.createIdentifier('exception')
                                            ),
                                            ts.factory.createToken(ts.SyntaxKind.BarBarToken),
                                            ts.factory.createArrayLiteralExpression([])
                                        )
                                    );
                                    exceptionArrayElements.push(spreadExpression);
                                });
                            }

                            // Chỉ thêm decorator nếu có exceptions
                            if (exceptionArrayElements.length > 0) {
                                const exceptionArray = ts.factory.createArrayLiteralExpression(
                                    exceptionArrayElements
                                );
                                
                                const decorator = ts.factory.createDecorator(
                                    ts.factory.createCallExpression(
                                        ts.factory.createPropertyAccessExpression(
                                            ts.factory.createIdentifier('Reflect'),
                                            ts.factory.createIdentifier('metadata')
                                        ),
                                        undefined,
                                        [
                                            ts.factory.createStringLiteral('exception'),
                                            exceptionArray
                                        ]
                                    )
                                );
                                
                                const updatedModifiers = member.modifiers
                                    ? [...member.modifiers, decorator]
                                    : [decorator];
                                    
                                return ts.factory.updateMethodDeclaration(
                                    member,
                                    updatedModifiers,
                                    member.asteriskToken,
                                    member.name,
                                    member.questionToken,
                                    member.typeParameters,
                                    member.parameters,
                                    member.type,
                                    member.body
                                );
                            }
                        }
                        return member;
                    });

                    return ts.factory.updateClassDeclaration(
                        node,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        updatedMembers
                    );
                }

                return ts.visitEachChild(node, visitor, context);
            }

            // Áp dụng visitor để xử lý toàn bộ file
            return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
        };
    };
}


export function addReflectMetadataImport(context: ts.TransformationContext) {
    return (sourceFile: ts.SourceFile) => {
        // Kiểm tra đã có import "reflect-metadata" chưa
        const hasReflectMetadataImport = sourceFile.statements.some(stmt =>
            ts.isImportDeclaration(stmt) &&
            ts.isStringLiteral(stmt.moduleSpecifier) &&
            stmt.moduleSpecifier.text === "reflect-metadata"
        );

        if (hasReflectMetadataImport) {
            return sourceFile;
        }

        // Tạo import "reflect-metadata"
        const reflectImport = ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createStringLiteral("reflect-metadata"),
            undefined
        );

        // Thêm vào đầu file
        return ts.factory.updateSourceFile(sourceFile, [
            reflectImport,
            ...sourceFile.statements,
        ]);
    };
}

export function customTransformer2(): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            // Lưu trữ thông tin exceptions cho mỗi function
            const functionExceptions = new Map<string, { [key: string]: ts.Identifier }>();
            // Lưu trữ các assignment statements cần thêm
            const additionalStatements: ts.Statement[] = [];

            // Hàm helper để thu thập throw new Error hoặc class lỗi tùy chỉnh
            function collectExceptions(node: ts.Node, functionKey: string | undefined) {
                if (
                    ts.isThrowStatement(node) &&
                    ts.isNewExpression(node.expression) &&
                    ts.isIdentifier(node.expression.expression) &&
                    node.expression.expression.text.includes('Error') // Chỉ lấy các class lỗi (như Error, TypeError, CustomError)
                ) {
                    const errorClass = node.expression.expression;
                    if (functionKey) {
                        if (!functionExceptions.has(functionKey)) {
                            functionExceptions.set(functionKey, {});
                        }
                        if (!functionExceptions.get(functionKey)![errorClass.text])
                            functionExceptions.get(functionKey)![errorClass.text] = errorClass
                    }
                }
                ts.forEachChild(node, (child) => collectExceptions(child, functionKey));
            }

            // Hàm visitor để phân tích các function declarations và function expressions
            function visitor(node: ts.Node): ts.Node {
                // Xử lý function declarations (function myFunc() {})
                if (ts.isFunctionDeclaration(node) && node.name) {
                    const functionName = node.name.text;
                    const functionKey = functionName;

                    // Thu thập exceptions trong function
                    ts.forEachChild(node, (child) => collectExceptions(child, functionKey));

                    // Thêm property .exception vào function
                    const exceptions = functionExceptions.get(functionKey);
                    if (exceptions && Object.keys(exceptions).length > 0) {
                        const exceptionArray = ts.factory.createArrayLiteralExpression(
                            Object.values(exceptions)
                        );

                        // Tạo assignment statement: functionName.exception = [exceptions]
                        const exceptionAssignment = ts.factory.createExpressionStatement(
                            ts.factory.createBinaryExpression(
                                ts.factory.createPropertyAccessExpression(
                                    ts.factory.createIdentifier(functionName),
                                    ts.factory.createIdentifier('exception')
                                ),
                                ts.factory.createToken(ts.SyntaxKind.EqualsToken),
                                exceptionArray
                            )
                        );

                        // Lưu assignment statement để thêm sau
                        additionalStatements.push(exceptionAssignment);
                    }
                }

                // Xử lý variable declarations với function expressions (const myFunc = function() {})
                if (ts.isVariableStatement(node)) {
                    const declaration = node.declarationList.declarations[0];
                    if (
                        declaration &&
                        ts.isVariableDeclaration(declaration) &&
                        declaration.initializer &&
                        (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer)) &&
                        ts.isIdentifier(declaration.name)
                    ) {
                        const functionName = declaration.name.text;
                        const functionKey = functionName;

                        // Thu thập exceptions trong function
                        ts.forEachChild(declaration.initializer, (child) => collectExceptions(child, functionKey));

                        // Thêm property .exception vào function
                        const exceptions = functionExceptions.get(functionKey);
                        if (exceptions && Object.keys(exceptions).length > 0) {
                            const exceptionArray = ts.factory.createArrayLiteralExpression(
                                Object.values(exceptions)
                            );

                            // Tạo assignment statement: functionName.exception = [exceptions]
                            const exceptionAssignment = ts.factory.createExpressionStatement(
                                ts.factory.createBinaryExpression(
                                    ts.factory.createPropertyAccessExpression(
                                        ts.factory.createIdentifier(functionName),
                                        ts.factory.createIdentifier('exception')
                                    ),
                                    ts.factory.createToken(ts.SyntaxKind.EqualsToken),
                                    exceptionArray
                                )
                            );

                            // Lưu assignment statement để thêm sau
                            additionalStatements.push(exceptionAssignment);
                        }
                    }
                }

                return ts.visitEachChild(node, visitor, context);
            }

            // Áp dụng visitor để xử lý toàn bộ file
            const transformedSourceFile = ts.visitNode(sourceFile, visitor) as ts.SourceFile;
            
            // Thêm các assignment statements vào cuối file
            const updatedStatements = [
                ...transformedSourceFile.statements,
                ...additionalStatements
            ];
            
            return ts.factory.updateSourceFile(transformedSourceFile, updatedStatements);
        };
    };
}

// Hàm utility để kết hợp cả 2 transformer
export function combineTransformers(): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            // Áp dụng customTransformer trước (cho class methods)
            const transformer1 = customTransformer()(context);
            const result1 = transformer1(sourceFile);
            
            // Sau đó áp dụng customTransformer2 (cho functions bên ngoài class)
            const transformer2 = customTransformer2()(context);
            const result2 = transformer2(result1);
            
            return result2;
        };
    };
}


