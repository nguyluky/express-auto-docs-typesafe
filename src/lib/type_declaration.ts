import "reflect-metadata";
import * as z from "zod/v4";
import { PropertyKey, wa } from "./PropertyKey";
import { UnauthorizedError } from "@utils/exception";
import { argv0 } from "process";

// Khóa metadata cho schema
const SCHEMA_METADATA_KEY = Symbol("schema");
const SCHEMA_DATA_METADATA_KEY = Symbol("schemaData");
const CONTEXT_TYPE_METADATA_KEY = Symbol("contextType");

interface SchemaData {
    cache?: z.ZodObject<any>;
    usageCount?: number;
}

export enum Formats {
    "email",
    "uuid",
    "url",
    "emoji",         // validates a single emoji character
    "base64",
    "base64url",
    "nanoid",
    "cuid",
    "cuid2",
    "ulid",
    "ipv4",
    "ipv6",
    "cidrv4",        // ipv4 CIDR block
    "cidrv6",        // ipv6 CIDR block
    "iso.date",
    "iso.time",
    "iso.datetime",
    "iso.duration",
}


// Interface cho các tùy chọn của decorator
interface NumberOptions {
    min?: number;
    max?: number;
    optional?: boolean;
    coerce?: boolean;
}

interface StringOptions {
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    optional?: boolean;
    format?: Formats
}

interface BooleanOptions {
    optional?: boolean;
}

interface ArrayOptions {
    minItems?: number;
    maxItems?: number;
    optional?: boolean;
}

interface ObjectOptions {
    optional?: boolean;
}

interface EnumOptions {
    value: string[]
    optional?: boolean;
}


function addFormat(z_: z.ZodString, format: Formats) {

    switch (format) {
        case Formats.email: return z_.email()
        case Formats.uuid: return z_.uuid()
        case Formats.url: return z_.url()
        case Formats.emoji: return z_.emoji()
        case Formats.base64: return z_.base64()
        case Formats.base64url: return z_.base64url()
        case Formats.nanoid: return z_.nanoid()
        case Formats.cuid: return z_.cuid()
        case Formats.cuid2: return z_.cuid2()
        case Formats.ulid: return z_.ulid()
        case Formats.ipv4: return z_.ipv4()
        case Formats.ipv6: return z_.ipv6()
        case Formats.cidrv4: return z_.cidrv4()
        case Formats.cidrv6: return z_.cidrv6()
        case Formats["iso.date"]: return z_.date()
        case Formats["iso.time"]: return z_.time()
        case Formats["iso.datetime"]: return z_.datetime()
        case Formats["iso.duration"]: return z_.duration()
    }
    return z_;
}

// Decorator cho Number
export function IsNumber(options: NumberOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.number();
        if (options.coerce) schema = z.coerce.number();
        if (options.min !== undefined) schema = schema.min(options.min);
        if (options.max !== undefined) schema = schema.max(options.max);
        if (options.optional) schema = schema.optional();
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho String
export function IsString(options: StringOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.string();
        if (options.minLength !== undefined) schema = schema.min(options.minLength);
        if (options.maxLength !== undefined) schema = schema.max(options.maxLength);
        if (options.email) schema = schema.email();
        if (options.optional) schema = schema.optional();
        if (options.format) schema = addFormat(schema, options.format);
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Boolean
export function IsBoolean(options: BooleanOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.boolean();
        if (options.optional) schema = schema.optional();
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Array
export function IsArray(itemSchema: z.ZodTypeAny, options: ArrayOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.array(itemSchema);
        if (options.minItems !== undefined) schema = schema.min(options.minItems);
        if (options.maxItems !== undefined) schema = schema.max(options.maxItems);
        if (options.optional) schema = schema.optional();
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Object
export function IsObject<T>(targetClass: new () => T, options: ObjectOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = toSchema(targetClass);
        if (options.optional) schema = schema.optional();
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}


export function IsEnum(options: EnumOptions) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.enum(options.value);
        if (options.optional) schema = schema.optional();
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

interface FileOptions {
    optional?: boolean;
    maxSize?: number; // in bytes
    allowedTypes?: string; // e.g. ["image/png", "image/jpeg"]
    minSize?: number; // in bytes
}

export function IsFile(options?: FileOptions) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.file();
        if (options?.optional) schema = schema.optional();
        if (options?.maxSize) schema = schema.max(options.maxSize,);
        if (options?.minSize) schema = schema.min(options.minSize,);
        if (options?.allowedTypes) {

            schema = schema.mime(options.allowedTypes)
        }
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

export function ContextType(conextType: string) {
    return function (target: any) {
        Reflect.defineMetadata(CONTEXT_TYPE_METADATA_KEY, conextType, target);
    };
}


export function getContextType(target: any): string | undefined {
    return Reflect.getMetadata(CONTEXT_TYPE_METADATA_KEY, target) as string | undefined;
}


// Hàm toSchema để tạo Zod schema từ class
export function toSchema<T>(target: new () => T): z.ZodObject<any> | null {

    // Tạo một đối tượng metadata giả để truy cập

    // check cache
    const cache: SchemaData = Reflect.getMetadata(SCHEMA_DATA_METADATA_KEY, target) || {};
    if (cache.cache) {
        // TODO: kiểm tra xem cache có được lưu không 
        cache.usageCount = (cache.usageCount || 0) + 1;
        Reflect.defineMetadata(SCHEMA_DATA_METADATA_KEY, cache, target);


        // Nếu cache đã được sử dụng quá nhiều lần, thì lưu nó vào globle registry

        if (cache.usageCount > 2 && !z.globalRegistry.has(cache.cache)) {
            console.log(`Adding schema for ${target.name} to global registry`);
            z.globalRegistry.add(cache.cache, {id: target.name})
        }

        return cache.cache;
    }

    const obj = new target() as Object;
    const schemaObject: Record<string, z.ZodTypeAny> = {};
    for (const propertyKey of Object.getOwnPropertyNames(obj)) {
        let schema = Reflect.getMetadata(SCHEMA_METADATA_KEY, obj, propertyKey);
        const default_value = (obj as any)[propertyKey];
        if (schema) {
            if (default_value) schema = schema.default(default_value)
            schemaObject[propertyKey] = schema;
        }

    }

    if (Object.keys(schemaObject).length === 0) {
        return null;
    }

    const zodSchema = z.object(schemaObject);
    // Lưu schema vào metadata để tái sử dụng
    cache.cache = zodSchema;
    cache.usageCount = 1;
    Reflect.defineMetadata(SCHEMA_DATA_METADATA_KEY, cache, target);

    return zodSchema;
}

export function toJsonSchema<T>(target: (new () => T) | (new () => T)[]) {

    if (Array.isArray(target)) {
        let b = target.map(e => toSchema(e)).filter(e => e !== null);
        return z.toJSONSchema(z.union(b));
    }
    const zod_schema = toSchema(target);

    if (!zod_schema) {
        return null;
    }

    return z.toJSONSchema(zod_schema);
}

