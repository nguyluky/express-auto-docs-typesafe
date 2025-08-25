# Socket.io Auto-Documentation System

Hệ thống tự động tạo documentation cho Socket.io API sử dụng TypeScript decorators.

## 🚀 Tính năng

- **Decorator-based**: Sử dụng decorators để định nghĩa socket events
- **Type-safe**: Validation với Zod schemas
- **Auto-generation**: Tự động tạo docs, AsyncAPI spec
- **Flexible patterns**: Hỗ trợ tất cả các pattern Socket.io
- **Integration**: Dễ tích hợp với existing codebase

## 📖 Cách sử dụng

### 1. Tạo Socket Controller

```typescript
import { SocketController, SocketEmitEvent } from "@lib/socket_declaration";
import { 
    SocketNamespace, 
    SocketListen, 
    SocketEmit, 
    SocketRequest, 
    SocketResponse 
} from "@lib/socket_decorators";

@SocketNamespace('/chat', { 
    description: 'Real-time chat functionality',
    auth: true 
})
export class ChatController extends SocketController {
    
    // Client → Server event
    @SocketListen('SendMessage', {
        description: 'Send a message to another user',
        example: { recipientId: "user123", message: "Hello!" }
    })
    @SocketRequest(SendMessageSchema)
    onSendMessage(client: Socket, data: any) {
        return new SocketEmitEvent('NewMessage', data, data.recipientId);
    }
    
    // Server → Client event (chỉ response)
    @SocketEmit('NewMessage', {
        description: 'New message received from another user'
    })
    @SocketResponse(NewMessageSchema)
    emitNewMessage() {
        // Documentation only
    }
}
```

### 2. Các loại Socket Events

#### Client → Server
```typescript
@SocketListen('EventName', { description: '...' })
@SocketRequest(RequestSchema)
onEventName(client: Socket, data: any) {
    // Handle client request
}
```

#### Server → Client (chỉ emit)
```typescript
@SocketEmit('EventName', { description: '...' })
@SocketResponse(ResponseSchema)
emitEventName() {
    // Documentation only
}
```

#### Bidirectional
```typescript
@SocketBidirectional('EventName', { description: '...' })
@SocketRequest(RequestSchema)
@SocketResponse(ResponseSchema)
handleEventName(client: Socket, data: any) {
    // Handle both directions
}
```

### 3. Generate Documentation

```bash
# Tạo documentation
npm run generate:socket-docs

# Khởi động socket server
npm run socket:server
```

## 📁 Files được tạo

- `docs/socket-api.md` - Markdown documentation
- `docs/socket-asyncapi.json` - AsyncAPI specification
- `docs/socket-docs-summary.md` - Summary report

## 🔧 Decorator Reference

### @SocketNamespace
Định nghĩa namespace cho controller:
```typescript
@SocketNamespace('/chat', { 
    description: 'Chat functionality',
    auth: true // Yêu cầu authentication
})
```

### @SocketEvent
Main decorator cho events:
```typescript
@SocketEvent('EventName', SocketEventType.CLIENT_TO_SERVER, {
    description: 'Event description',
    example: { key: 'value' },
    acknowledgment: true // Có callback hay không
})
```

### Shorthand Decorators
- `@SocketListen` = CLIENT_TO_SERVER
- `@SocketEmit` = SERVER_TO_CLIENT  
- `@SocketBidirectional` = BIDIRECTIONAL

### Schema Decorators
```typescript
@SocketRequest(SchemaClass)  // Request validation
@SocketResponse(SchemaClass) // Response documentation
```

## 🎯 Event Types

- `CLIENT_TO_SERVER` - Client gửi, server nhận
- `SERVER_TO_CLIENT` - Server gửi, client nhận
- `BIDIRECTIONAL` - Cả hai chiều
- `SERVER_EMIT_ONLY` - Chỉ server emit
- `CLIENT_LISTEN_ONLY` - Chỉ client listen

## 📊 Integration với Business Logic

```typescript
import { socketEmitter } from './socket-server';

export class ChatService {
    async sendMessage(senderId: string, recipientId: string, message: string) {
        // Save to database
        const savedMessage = await this.saveMessage(senderId, recipientId, message);
        
        // Emit socket event
        socketEmitter.emitToNamespace('/chat', new SocketEmitEvent(
            'NewMessage',
            savedMessage,
            recipientId // Target specific user
        ));
    }
}
```

## 🔍 Advanced Features

### Authentication
```typescript
// Socket auth middleware tự động được apply cho namespaces có auth: true
const socketAuthMiddleware = async (socket, next) => {
    const token = socket.handshake.query.token;
    const user = verifyAccessToken(token);
    socket.data = { user };
    next();
};
```

### Event Targeting
```typescript
new SocketEmitEvent('EventName', data, target, room, broadcast)

// Specific user
new SocketEmitEvent('Message', data, 'userId123')

// Room
new SocketEmitEvent('Message', data, undefined, 'roomId')

// Broadcast to all
new SocketEmitEvent('Message', data, undefined, undefined, true)
```

### Error Handling
Hệ thống tự động handle validation errors và emit error events:
```typescript
client.emit('error', {
    event: 'SendMessage',
    message: 'Validation failed',
    code: 'VALIDATION_ERROR'
});
```

## 📚 Generated Documentation

Documentation được tạo sẽ bao gồm:

1. **API Overview** với tất cả namespaces
2. **Event Details** với schemas và examples
3. **Authentication Requirements**
4. **AsyncAPI Specification** cho tooling integration

## 🚀 Best Practices

1. **Naming**: Sử dụng PascalCase cho event names
2. **Documentation**: Luôn thêm description có ý nghĩa
3. **Examples**: Cung cấp example data cho complex schemas
4. **Schemas**: Định nghĩa rõ ràng request/response schemas
5. **Error Handling**: Handle errors gracefully trong controllers

## 🔧 Development

```bash
# Install dependencies
npm install

# Generate socket docs
npm run generate:socket-docs

# Start socket server
npm run socket:server

# Development với auto-reload
npm run start:dev
```

## 📝 Example Output

Generated markdown sẽ trông như thế này:

```markdown
## Namespace: `/chat`

Real-time chat functionality

**Authentication Required**: Yes

### Events

#### `SendMessage`

**Direction**: client-to-server

Send a message to another user

**Request Schema**:
```json
{
  "type": "object",
  "properties": {
    "recipientId": { "type": "string" },
    "message": { "type": "string" }
  }
}
```

**Example**:
```json
{
  "recipientId": "user123",
  "message": "Hello there!"
}
```
```

Hệ thống này giúp bạn có documentation luôn sync với code và giảm thiểu boilerplate! 🎉
