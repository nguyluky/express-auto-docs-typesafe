#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Vui lòng nhập tên module!');
  process.exit(1);
}

const baseDir = path.resolve(__dirname, '../src/module', moduleName);
const typesDir = path.join(baseDir, 'types');

if (fs.existsSync(baseDir)) {
  console.error('Module đã tồn tại!');
  process.exit(1);
}

fs.mkdirSync(typesDir, { recursive: true });

// Controller
fs.writeFileSync(
  path.join(baseDir, 'controller.ts'),
  `import { Request, Response } from 'express';
import * as Service from './service';

class ${capitalize(moduleName)}Controller {
  // @Get()
  async get(req: Request, res: Response) {
    // ...
  }
  // @Post()
  async create(req: Request, res: Response) {
    // ...
  }
}

export default new ${capitalize(moduleName)}Controller();
`
);

// Service
fs.writeFileSync(
  path.join(baseDir, 'service.ts'),
  `export async function get() {
  // ...
}

export async function create() {
  // ...
}
`
);

// Types Example
fs.writeFileSync(
  path.join(typesDir, `${moduleName}.type.ts`),
  `import { z } from 'zod';

export const ${moduleName}Schema = z.object({
  // ...fields
});

export type ${capitalize(moduleName)}Type = z.infer<typeof ${moduleName}Schema>;
`
);

console.log(`Module ${moduleName} đã được tạo.`);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
