import { Description, Get, Summary } from "@lib/httpMethod";
import { swagger } from "@lib/swagget";
import { RouterSchema, toSwaggerSchema } from "@lib/toRouter";
import * as fs from "fs";
import z from "zod/v4";



export default class SwaggerController {
    swagger: any;
    sockets: any;
    layout: string;

    constructor(apiRouter: RouterSchema[]) {
        this.swagger = toSwaggerSchema(apiRouter, swagger);

        this.swagger.components = this.swagger.components || {};
        const globalShema = z.toJSONSchema(z.globalRegistry, {
            uri: (id: string) => `#/components/schemas/${id}`,
        });
        this.swagger.components = { ...this.swagger.components, ...globalShema };

        this.swagger.servers = this.swagger.servers || [];
        this.swagger.servers.push({
            url: process.env.PORT ? `http://localhost:${process.env.PORT}` : "http://localhost:3000",
            description: "Local development server"
        });

        this.layout = "responsive"
        fs.writeFile('./docs/swagger.json', JSON.stringify(this.swagger, null, 2), (err) => {
            if (err) {
                console.error("Error writing swagger.json:", err);
            } else {
                console.log("swagger.json has been saved.");
            }
        })
    }

    @Get("/swagger.json")
    @Summary("Get Swagger JSON")
    @Description("Get the Swagger/OpenAPI JSON specification")
    GetSwaggerFile() {
        return this.swagger;
    }

    @Get("/asyncApi.json")
    @Summary("Get Swagger JSON")
    @Description("Get the Swagger/OpenAPI JSON specification")
    GetAsyncApiFile() {
        if (this.sockets) return this.sockets;
        this.sockets = JSON.parse(fs.readFileSync('./docs/socket.json', 'utf-8'));
        return this.sockets;

    }


    @Get("/")
    @Summary("Swagger UI")
    @Description("View API documentation with Swagger UI")
    SwaggerUI() {
        const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>
    ${this.swagger.info.title} - API Documentation
    </title>
  
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="/docs/swagger.json"
      router="hash"
      layout="${this.layout}"
    />

  </body>
</html>
`
        return html;
    }
}
