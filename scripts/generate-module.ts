#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Vui lòng nhập tên module!');
  process.exit(1);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const baseDir = path.resolve(__dirname, '../src/module', moduleName);
const typesDir = path.join(baseDir, 'types');

if (fs.existsSync(baseDir)) {
  console.error('Module đã tồn tại!');
  process.exit(1);
}

fs.mkdirSync(typesDir, { recursive: true });

// Controller file
fs.writeFileSync(
  path.join(baseDir, 'controller.ts'),
  `import { Get, Post } from "@lib/httpMethod";
import * as ${capitalize(moduleName)}Types from "./types/${moduleName}.type";
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";

export default class ${capitalize(moduleName)}Controller {
    @Get("/")
    @Validate(${capitalize(moduleName)}Types.GetAllSchema)
    async getAll(req: ${capitalize(moduleName)}Types.GetAllReq) {
        // Gọi service, xử lý logic
        return await Service.getAll(req);
    }

    @Get("/:id")
    @Validate(${capitalize(moduleName)}Types.GetByIdSchema)
    async getById(req: ${capitalize(moduleName)}Types.GetByIdReq) {
        // Gọi service, xử lý logic
        return await Service.getById(req);
    }
}
`
);

// Service file
fs.writeFileSync(
  path.join(baseDir, 'service.ts'),
  `import prisma from "config/prisma.config";
import * as ${capitalize(moduleName)}Types from "./types/${moduleName}.type";

export async function getAll(req: ${capitalize(moduleName)}Types.GetAllReq) {
    // TODO: Logic query DB với req.query
    return [];
}

export async function getById(req: ${capitalize(moduleName)}Types.GetByIdReq) {
    // TODO: Logic query DB với req.params
    return null;
}
`
);


console.log(`Module "${moduleName}" đã được tạo chuẩn!`);
