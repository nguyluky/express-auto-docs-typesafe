import { Get } from "@lib/httpMethod";
import { makeSwagger } from "@lib/swagget";
import { Router } from "express";
import * as fs from "fs";


export default class SwaggerController {
    swagger: any;
    layout: string;

    constructor(apiRouter: Router) {
        this.swagger = makeSwagger(apiRouter);
        this.layout = "responsive"
        fs.writeFile('swagger.json', JSON.stringify(this.swagger, null, 2), (err) => {
            if (err) {
                console.error("Error writing swagger.json:", err);
            } else {
                console.log("swagger.json has been saved.");
            }
        } )
    }

    @Get("/swagger.json")
    GetSwaggerFile() {
        return this.swagger;
    }


    @Get("/")
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
