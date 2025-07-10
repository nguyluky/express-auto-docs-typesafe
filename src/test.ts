import "reflect-metadata";
import * as z from "zod/v4";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsObject,
  toSchema,
  toJsonSchema
} from "./lib/type_declaration"; // Thay đổi nếu tên file khác

class Address {
  @IsString({ minLength: 5 })
  street: string;

  @IsString({ optional: true })
  city?: string;
}

class User {
  @IsString({ minLength: 3, maxLength: 20 })
  name: string;

  @IsNumber({ min: 0 })
  age: number;

  @IsBoolean({ optional: true })
  isAdmin?: boolean;

  @IsArray(z.string(), { minItems: 1 })
  tags: string[];

  @IsObject(Address)
  address: Address;
}

console.log(Object.getOwnPropertyNames(User.prototype))

console.log(Reflect.getOwnMetadataKeys(new User()))
// Tạo Zod schema từ class
const UserSchema = toSchema(User);


for (const a of Object.keys(UserSchema.shape)) {
    console.log(z.toJSONSchema(UserSchema.shape[a]))
}
