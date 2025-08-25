import { SecurityScheme } from "@lib/BaseAuth";
import { SOCKET_EVENT_KEY, SOCKET_NAMESPACE_KEY, SocketEventInfo, SocketEventType } from "./socket_decorators";
import { toJsonSchema } from "./type_declaration";

interface SocketDocumentation {
    name: string;
    description?: string;
    version?: string;
    servers?: {
        url: string;
        description?: string;
    }[];
    components?: {
        // add references for schemas
        schemas?: {
            [schemaName: string]: any; // JSON Schema definitions
        };
        // TODO: add references for security schemes
        securitySchemes?: {
            [schemeName: string]: SecurityScheme;
        };
    };
    namespaces: {
        [path: string]: {
            description?: string;
            auth?: SecurityScheme[];
            events: {
                [eventName: string]: {
                    direction: SocketEventType;
                    description?: string;
                    requestSchema?: any;
                    responseSchema?: any;
                    example?: any;
                    deprecated?: boolean;
                    acknowledgment?: boolean;
                };
            };
        };
    };
}

export function generateSocketDocs(controllers: any[], name: string = "socket"): SocketDocumentation {
    const docs: SocketDocumentation = { namespaces: {} , name};
    
    for (const ControllerClass of controllers) {
        const controller = new ControllerClass();
        const namespaceInfo = Reflect.getMetadata(SOCKET_NAMESPACE_KEY, ControllerClass);
        
        if (!namespaceInfo) continue;
        
        const namespacePath = namespaceInfo.path;
        docs.namespaces[namespacePath] = {
            description: namespaceInfo.description,
            auth: namespaceInfo.auth,
            events: {}
        };
        
        // Scan tất cả methods
        const methods = [
            ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
            ...Object.getOwnPropertyNames(controller)
        ].filter(method => typeof controller[method] === 'function');
        
        for (const method of methods) {
            const eventInfo = Reflect.getMetadata(SOCKET_EVENT_KEY, controller, method) as SocketEventInfo;
            if (!eventInfo) continue;
            
            const eventName = eventInfo.eventName;
            
            // console.log(eventInfo)
            docs.namespaces[namespacePath].events[eventName] = {
                direction: eventInfo.type,
                description: eventInfo.description,
                // Chỉ include schema nếu có
                ...(eventInfo.requestSchema && { 
                    requestSchema: toJsonSchema(eventInfo.requestSchema) 
                }),
                ...(eventInfo.responseSchema && { 
                    responseSchema: toJsonSchema(eventInfo.responseSchema) 
                }),
                example: eventInfo.example,
                deprecated: eventInfo.deprecated,
                acknowledgment: eventInfo.acknowledgment
            };
        }
    }
    
    return docs;
}

// Generate markdown docs
export function generateMarkdownDocs(controllers: any[]): string {
    const socketDocs = generateSocketDocs(controllers);
    let markdown = '# Socket.io API Documentation\n\n';
    
    for (const [namespacePath, namespaceData] of Object.entries(socketDocs.namespaces)) {
        markdown += `## Namespace: \`${namespacePath}\`\n\n`;
        if (namespaceData.description) {
            markdown += `${namespaceData.description}\n\n`;
        }
        if (namespaceData.auth) {
            markdown += `**Authentication Required**: Yes\n\n`;
        }
        
        markdown += `### Events\n\n`;
        
        for (const [eventName, eventData] of Object.entries(namespaceData.events)) {
            markdown += `#### \`${eventName}\`\n\n`;
            markdown += `**Direction**: ${eventData.direction}\n\n`;
            
            if (eventData.description) {
                markdown += `${eventData.description}\n\n`;
            }
            
            if (eventData.acknowledgment) {
                markdown += `**Acknowledgment**: Yes\n\n`;
            }
            
            if (eventData.requestSchema) {
                markdown += `**Request Schema**:\n\`\`\`json\n${JSON.stringify(eventData.requestSchema, null, 2)}\n\`\`\`\n\n`;
            }
            
            if (eventData.responseSchema) {
                markdown += `**Response Schema**:\n\`\`\`json\n${JSON.stringify(eventData.responseSchema, null, 2)}\n\`\`\`\n\n`;
            }
            
            if (eventData.example) {
                markdown += `**Example**:\n\`\`\`json\n${JSON.stringify(eventData.example, null, 2)}\n\`\`\`\n\n`;
            }
            
            if (eventData.deprecated) {
                markdown += `**⚠️ Deprecated**: This event is deprecated and will be removed in future versions.\n\n`;
            }
            
            markdown += `---\n\n`;
        }
    }
    
    return markdown;
}
