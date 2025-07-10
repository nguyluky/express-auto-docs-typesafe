import { Router } from "express"

const swagger = {
    "openapi": "3.0.3",
    "info": {
        "title": "Course Swapping API",
        "description": "API for a third-party course swapping platform for Saigon University students.",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Local development server"
        },
        {
            "url": "https://course-swap.example.com",
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


export function makeSwagger(router: Router) {
    const paths = (router as any).swagger as Object | {};

    const newSwagger = {...swagger, paths: paths}
    return newSwagger;
}

