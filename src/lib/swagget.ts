import { Router } from "express"


const description = `
A simple tiktok clone API

# Sokket.io is used for real-time features like chats, notifications

## chats real-time: ws://localhost:3000/chat?token=<your_token>

### Client -> Server:
- **Event name**: \`SendMessage\`
- **Data**: \`{ recipientId: string, message: string }\`

### Server -> Client:
- **Event name**: \`NewMessage\`
- **Data**: \`{ senderId: string, recipientId: string, message: string }\`


## Notifications real-time: ws://localhost:3000/notifications?token=<your_token>
### Server -> Client:
- **Event name**: \`NewNotification\`
- **Data**: \`{ userId: string, message: string }\`

`


export const swagger = {
    "openapi": "3.0.3",
    "info": {
        "title": "tiktok clone",
        "description": description,
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Local development server"
        },
        {
            "url": "https://test.tkbsgusort.id.vn",
            "description": "Production server"
        }
    ],
    "components": {
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        },
    },
    paths: {
    }
}

