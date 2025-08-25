import fs from "fs";
import path from "path";

if (process.argv.length < 4) {
    console.error("Usage: npx ts-node add_endpoint.ts <module> <EndpointName>");
    process.exit(1);
}
const [,, moduleName, endpointName] = process.argv;
if (!moduleName || !endpointName) {
  console.error("Usage: npx ts-node add_endpoint.ts <module> <EndpointName>");
  process.exit(1);
}

const controllerPath = path.resolve(__dirname, `../src/module/${moduleName}/controller.ts`);
const typesDir = path.resolve(__dirname, `../src/module/${moduleName}/types`);
const typeFilePath = path.join(typesDir, `${endpointName}.type.ts`);

const typeImport = `import * as ${endpointName}Type from "./types/${endpointName}.type";`;
const methodCode = `
    @Get("/")
    @Validate(${endpointName}Type.schema)
    async ${endpointName}(req: ${endpointName}Type.Req) {
        throw new Error();
    }
`;

// 1. Thêm import vào đầu file controller nếu chưa có
let controllerContent = fs.readFileSync(controllerPath, "utf-8");
if (!controllerContent.includes(typeImport)) {
    // add import statement at the top
    controllerContent = `${typeImport}\n${controllerContent}`;
}

// 2. Chèn method trước dấu } cuối cùng của class
controllerContent = controllerContent.replace(/(\}\s*)$/, `${methodCode}\n$1`);
fs.writeFileSync(controllerPath, controllerContent, "utf-8");

// 3. Tạo file type nếu chưa có
if (!fs.existsSync(typeFilePath)) {
    fs.writeFileSync(typeFilePath, 
`import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";

export class ${endpointName}ReqBody {}
export class ${endpointName}ReqQuery {}
export class ${endpointName}ReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class ${endpointName}Res {}

export const schema = {
    res: [${endpointName}Res],
    body: ${endpointName}ReqBody,
    query: ${endpointName}ReqQuery,
    params: ${endpointName}ReqParams
};

export type Req = Request<${endpointName}ReqParams, any, ${endpointName}ReqBody, ${endpointName}ReqQuery>;
`, "utf-8");
    console.log("Đã tạo file types:", typeFilePath);
} else {
    console.log("File types đã tồn tại:", typeFilePath);
}
console.log("Đã thêm method vào controller:", controllerPath);
