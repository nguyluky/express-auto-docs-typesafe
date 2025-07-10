import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const Ds_monScalarFieldEnumSchema = z.enum(['id','display_name']);

export const Ds_mon_theo_namScalarFieldEnumSchema = z.enum(['year','semester','ma_mon']);

export const Ds_nhom_hocScalarFieldEnumSchema = z.enum(['id_to_hoc','ma_mon','so_tc','nhom','nam','tkb_map']);

export const Exchange_postsScalarFieldEnumSchema = z.enum(['id','id_mon','current_section','desired_section','description','author','created_at','updated_at','deleted_at','is_active']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','password','email','two_factor_secret','created_at','updated_at','deleted_at','is_active']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ds_monOrderByRelevanceFieldEnumSchema = z.enum(['id','display_name']);

export const ds_mon_theo_namOrderByRelevanceFieldEnumSchema = z.enum(['year','ma_mon']);

export const ds_nhom_hocOrderByRelevanceFieldEnumSchema = z.enum(['id_to_hoc','ma_mon','nhom','nam']);

export const exchange_postsOrderByRelevanceFieldEnumSchema = z.enum(['id_mon','current_section','desired_section','description']);

export const userOrderByRelevanceFieldEnumSchema = z.enum(['username','password','email','two_factor_secret']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// DS MON SCHEMA
/////////////////////////////////////////

export const ds_monSchema = z.object({
  id: z.string(),
  display_name: z.string().nullable(),
})

export type ds_mon = z.infer<typeof ds_monSchema>

/////////////////////////////////////////
// DS MON THEO NAM SCHEMA
/////////////////////////////////////////

export const ds_mon_theo_namSchema = z.object({
  year: z.string(),
  semester: z.number().int(),
  ma_mon: z.string(),
})

export type ds_mon_theo_nam = z.infer<typeof ds_mon_theo_namSchema>

/////////////////////////////////////////
// DS NHOM HOC SCHEMA
/////////////////////////////////////////

export const ds_nhom_hocSchema = z.object({
  id_to_hoc: z.string(),
  ma_mon: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().nullable(),
  nam: z.string().nullable(),
  tkb_map: z.bigint().nullable(),
})

export type ds_nhom_hoc = z.infer<typeof ds_nhom_hocSchema>

/////////////////////////////////////////
// EXCHANGE POSTS SCHEMA
/////////////////////////////////////////

export const exchange_postsSchema = z.object({
  id: z.number().int(),
  id_mon: z.string(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  author: z.number().int(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  is_active: z.boolean().nullable(),
})

export type exchange_posts = z.infer<typeof exchange_postsSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  is_active: z.boolean().nullable(),
})

export type user = z.infer<typeof userSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// DS MON
//------------------------------------------------------

export const ds_monIncludeSchema: z.ZodType<Prisma.ds_monInclude> = z.object({
  ds_nhom_hoc: z.union([z.boolean(),z.lazy(() => ds_nhom_hocFindManyArgsSchema)]).optional(),
  exchange_posts: z.union([z.boolean(),z.lazy(() => exchange_postsFindManyArgsSchema)]).optional(),
  ds_mon_theo_nam: z.union([z.boolean(),z.lazy(() => ds_mon_theo_namFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Ds_monCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ds_monArgsSchema: z.ZodType<Prisma.ds_monDefaultArgs> = z.object({
  select: z.lazy(() => ds_monSelectSchema).optional(),
  include: z.lazy(() => ds_monIncludeSchema).optional(),
}).strict();

export const ds_monCountOutputTypeArgsSchema: z.ZodType<Prisma.ds_monCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ds_monCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ds_monCountOutputTypeSelectSchema: z.ZodType<Prisma.ds_monCountOutputTypeSelect> = z.object({
  ds_nhom_hoc: z.boolean().optional(),
  exchange_posts: z.boolean().optional(),
  ds_mon_theo_nam: z.boolean().optional(),
}).strict();

export const ds_monSelectSchema: z.ZodType<Prisma.ds_monSelect> = z.object({
  id: z.boolean().optional(),
  display_name: z.boolean().optional(),
  ds_nhom_hoc: z.union([z.boolean(),z.lazy(() => ds_nhom_hocFindManyArgsSchema)]).optional(),
  exchange_posts: z.union([z.boolean(),z.lazy(() => exchange_postsFindManyArgsSchema)]).optional(),
  ds_mon_theo_nam: z.union([z.boolean(),z.lazy(() => ds_mon_theo_namFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Ds_monCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DS MON THEO NAM
//------------------------------------------------------

export const ds_mon_theo_namIncludeSchema: z.ZodType<Prisma.ds_mon_theo_namInclude> = z.object({
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

export const ds_mon_theo_namArgsSchema: z.ZodType<Prisma.ds_mon_theo_namDefaultArgs> = z.object({
  select: z.lazy(() => ds_mon_theo_namSelectSchema).optional(),
  include: z.lazy(() => ds_mon_theo_namIncludeSchema).optional(),
}).strict();

export const ds_mon_theo_namSelectSchema: z.ZodType<Prisma.ds_mon_theo_namSelect> = z.object({
  year: z.boolean().optional(),
  semester: z.boolean().optional(),
  ma_mon: z.boolean().optional(),
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

// DS NHOM HOC
//------------------------------------------------------

export const ds_nhom_hocIncludeSchema: z.ZodType<Prisma.ds_nhom_hocInclude> = z.object({
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

export const ds_nhom_hocArgsSchema: z.ZodType<Prisma.ds_nhom_hocDefaultArgs> = z.object({
  select: z.lazy(() => ds_nhom_hocSelectSchema).optional(),
  include: z.lazy(() => ds_nhom_hocIncludeSchema).optional(),
}).strict();

export const ds_nhom_hocSelectSchema: z.ZodType<Prisma.ds_nhom_hocSelect> = z.object({
  id_to_hoc: z.boolean().optional(),
  ma_mon: z.boolean().optional(),
  so_tc: z.boolean().optional(),
  nhom: z.boolean().optional(),
  nam: z.boolean().optional(),
  tkb_map: z.boolean().optional(),
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

// EXCHANGE POSTS
//------------------------------------------------------

export const exchange_postsIncludeSchema: z.ZodType<Prisma.exchange_postsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

export const exchange_postsArgsSchema: z.ZodType<Prisma.exchange_postsDefaultArgs> = z.object({
  select: z.lazy(() => exchange_postsSelectSchema).optional(),
  include: z.lazy(() => exchange_postsIncludeSchema).optional(),
}).strict();

export const exchange_postsSelectSchema: z.ZodType<Prisma.exchange_postsSelect> = z.object({
  id: z.boolean().optional(),
  id_mon: z.boolean().optional(),
  current_section: z.boolean().optional(),
  desired_section: z.boolean().optional(),
  description: z.boolean().optional(),
  author: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  is_active: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => userArgsSchema)]).optional(),
  ds_mon: z.union([z.boolean(),z.lazy(() => ds_monArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const userIncludeSchema: z.ZodType<Prisma.userInclude> = z.object({
  exchange_posts: z.union([z.boolean(),z.lazy(() => exchange_postsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const userArgsSchema: z.ZodType<Prisma.userDefaultArgs> = z.object({
  select: z.lazy(() => userSelectSchema).optional(),
  include: z.lazy(() => userIncludeSchema).optional(),
}).strict();

export const userCountOutputTypeArgsSchema: z.ZodType<Prisma.userCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => userCountOutputTypeSelectSchema).nullish(),
}).strict();

export const userCountOutputTypeSelectSchema: z.ZodType<Prisma.userCountOutputTypeSelect> = z.object({
  exchange_posts: z.boolean().optional(),
}).strict();

export const userSelectSchema: z.ZodType<Prisma.userSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  email: z.boolean().optional(),
  two_factor_secret: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  is_active: z.boolean().optional(),
  exchange_posts: z.union([z.boolean(),z.lazy(() => exchange_postsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ds_monWhereInputSchema: z.ZodType<Prisma.ds_monWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ds_monWhereInputSchema),z.lazy(() => ds_monWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_monWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_monWhereInputSchema),z.lazy(() => ds_monWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  display_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => Ds_nhom_hocListRelationFilterSchema).optional(),
  exchange_posts: z.lazy(() => Exchange_postsListRelationFilterSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => Ds_mon_theo_namListRelationFilterSchema).optional()
}).strict();

export const ds_monOrderByWithRelationInputSchema: z.ZodType<Prisma.ds_monOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocOrderByRelationAggregateInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsOrderByRelationAggregateInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => ds_monOrderByRelevanceInputSchema).optional()
}).strict();

export const ds_monWhereUniqueInputSchema: z.ZodType<Prisma.ds_monWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ds_monWhereInputSchema),z.lazy(() => ds_monWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_monWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_monWhereInputSchema),z.lazy(() => ds_monWhereInputSchema).array() ]).optional(),
  display_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => Ds_nhom_hocListRelationFilterSchema).optional(),
  exchange_posts: z.lazy(() => Exchange_postsListRelationFilterSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => Ds_mon_theo_namListRelationFilterSchema).optional()
}).strict());

export const ds_monOrderByWithAggregationInputSchema: z.ZodType<Prisma.ds_monOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ds_monCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ds_monMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ds_monMinOrderByAggregateInputSchema).optional()
}).strict();

export const ds_monScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ds_monScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ds_monScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_monScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_monScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_monScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_monScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  display_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ds_mon_theo_namWhereInputSchema: z.ZodType<Prisma.ds_mon_theo_namWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ds_mon_theo_namWhereInputSchema),z.lazy(() => ds_mon_theo_namWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_mon_theo_namWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_mon_theo_namWhereInputSchema),z.lazy(() => ds_mon_theo_namWhereInputSchema).array() ]).optional(),
  year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  semester: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict();

export const ds_mon_theo_namOrderByWithRelationInputSchema: z.ZodType<Prisma.ds_mon_theo_namOrderByWithRelationInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional(),
  semester: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  ds_mon: z.lazy(() => ds_monOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ds_mon_theo_namOrderByRelevanceInputSchema).optional()
}).strict();

export const ds_mon_theo_namWhereUniqueInputSchema: z.ZodType<Prisma.ds_mon_theo_namWhereUniqueInput> = z.object({
  ma_mon_year_semester: z.lazy(() => ds_mon_theo_namMa_monYearSemesterCompoundUniqueInputSchema)
})
.and(z.object({
  ma_mon_year_semester: z.lazy(() => ds_mon_theo_namMa_monYearSemesterCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ds_mon_theo_namWhereInputSchema),z.lazy(() => ds_mon_theo_namWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_mon_theo_namWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_mon_theo_namWhereInputSchema),z.lazy(() => ds_mon_theo_namWhereInputSchema).array() ]).optional(),
  year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  semester: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict());

export const ds_mon_theo_namOrderByWithAggregationInputSchema: z.ZodType<Prisma.ds_mon_theo_namOrderByWithAggregationInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional(),
  semester: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ds_mon_theo_namCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ds_mon_theo_namAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ds_mon_theo_namMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ds_mon_theo_namMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ds_mon_theo_namSumOrderByAggregateInputSchema).optional()
}).strict();

export const ds_mon_theo_namScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ds_mon_theo_namScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_mon_theo_namScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  year: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  semester: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ds_nhom_hocWhereInputSchema: z.ZodType<Prisma.ds_nhom_hocWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ds_nhom_hocWhereInputSchema),z.lazy(() => ds_nhom_hocWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_nhom_hocWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_nhom_hocWhereInputSchema),z.lazy(() => ds_nhom_hocWhereInputSchema).array() ]).optional(),
  id_to_hoc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  so_tc: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nhom: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nam: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tkb_map: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict();

export const ds_nhom_hocOrderByWithRelationInputSchema: z.ZodType<Prisma.ds_nhom_hocOrderByWithRelationInput> = z.object({
  id_to_hoc: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  nhom: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nam: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tkb_map: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ds_mon: z.lazy(() => ds_monOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ds_nhom_hocOrderByRelevanceInputSchema).optional()
}).strict();

export const ds_nhom_hocWhereUniqueInputSchema: z.ZodType<Prisma.ds_nhom_hocWhereUniqueInput> = z.object({
  id_to_hoc: z.string()
})
.and(z.object({
  id_to_hoc: z.string().optional(),
  AND: z.union([ z.lazy(() => ds_nhom_hocWhereInputSchema),z.lazy(() => ds_nhom_hocWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_nhom_hocWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_nhom_hocWhereInputSchema),z.lazy(() => ds_nhom_hocWhereInputSchema).array() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  so_tc: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  nhom: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nam: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tkb_map: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict());

export const ds_nhom_hocOrderByWithAggregationInputSchema: z.ZodType<Prisma.ds_nhom_hocOrderByWithAggregationInput> = z.object({
  id_to_hoc: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  nhom: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nam: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tkb_map: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ds_nhom_hocCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ds_nhom_hocAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ds_nhom_hocMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ds_nhom_hocMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ds_nhom_hocSumOrderByAggregateInputSchema).optional()
}).strict();

export const ds_nhom_hocScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ds_nhom_hocScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ds_nhom_hocScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_nhom_hocScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_nhom_hocScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_nhom_hocScalarWhereWithAggregatesInputSchema),z.lazy(() => ds_nhom_hocScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id_to_hoc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  so_tc: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nhom: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nam: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tkb_map: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
}).strict();

export const exchange_postsWhereInputSchema: z.ZodType<Prisma.exchange_postsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => exchange_postsWhereInputSchema),z.lazy(() => exchange_postsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => exchange_postsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => exchange_postsWhereInputSchema),z.lazy(() => exchange_postsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  current_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desired_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict();

export const exchange_postsOrderByWithRelationInputSchema: z.ZodType<Prisma.exchange_postsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_mon: z.lazy(() => SortOrderSchema).optional(),
  current_section: z.lazy(() => SortOrderSchema).optional(),
  desired_section: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => userOrderByWithRelationInputSchema).optional(),
  ds_mon: z.lazy(() => ds_monOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => exchange_postsOrderByRelevanceInputSchema).optional()
}).strict();

export const exchange_postsWhereUniqueInputSchema: z.ZodType<Prisma.exchange_postsWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => exchange_postsWhereInputSchema),z.lazy(() => exchange_postsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => exchange_postsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => exchange_postsWhereInputSchema),z.lazy(() => exchange_postsWhereInputSchema).array() ]).optional(),
  id_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  current_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desired_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => userWhereInputSchema) ]).optional(),
  ds_mon: z.union([ z.lazy(() => Ds_monScalarRelationFilterSchema),z.lazy(() => ds_monWhereInputSchema) ]).optional(),
}).strict());

export const exchange_postsOrderByWithAggregationInputSchema: z.ZodType<Prisma.exchange_postsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_mon: z.lazy(() => SortOrderSchema).optional(),
  current_section: z.lazy(() => SortOrderSchema).optional(),
  desired_section: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => exchange_postsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => exchange_postsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => exchange_postsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => exchange_postsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => exchange_postsSumOrderByAggregateInputSchema).optional()
}).strict();

export const exchange_postsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.exchange_postsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => exchange_postsScalarWhereWithAggregatesInputSchema),z.lazy(() => exchange_postsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => exchange_postsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => exchange_postsScalarWhereWithAggregatesInputSchema),z.lazy(() => exchange_postsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  id_mon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  current_section: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desired_section: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const userWhereInputSchema: z.ZodType<Prisma.userWhereInput> = z.object({
  AND: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  two_factor_secret: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  exchange_posts: z.lazy(() => Exchange_postsListRelationFilterSchema).optional()
}).strict();

export const userOrderByWithRelationInputSchema: z.ZodType<Prisma.userOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  two_factor_secret: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  exchange_posts: z.lazy(() => exchange_postsOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => userOrderByRelevanceInputSchema).optional()
}).strict();

export const userWhereUniqueInputSchema: z.ZodType<Prisma.userWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userWhereInputSchema),z.lazy(() => userWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  two_factor_secret: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  exchange_posts: z.lazy(() => Exchange_postsListRelationFilterSchema).optional()
}).strict());

export const userOrderByWithAggregationInputSchema: z.ZodType<Prisma.userOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  two_factor_secret: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => userCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => userAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => userMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => userMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => userSumOrderByAggregateInputSchema).optional()
}).strict();

export const userScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.userScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => userScalarWhereWithAggregatesInputSchema),z.lazy(() => userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => userScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => userScalarWhereWithAggregatesInputSchema),z.lazy(() => userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  two_factor_secret: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ds_monCreateInputSchema: z.ZodType<Prisma.ds_monCreateInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocCreateNestedManyWithoutDs_monInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monUncheckedCreateInputSchema: z.ZodType<Prisma.ds_monUncheckedCreateInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedCreateNestedManyWithoutDs_monInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monUpdateInputSchema: z.ZodType<Prisma.ds_monUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUpdateManyWithoutDs_monNestedInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monUncheckedUpdateInputSchema: z.ZodType<Prisma.ds_monUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monCreateManyInputSchema: z.ZodType<Prisma.ds_monCreateManyInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable()
}).strict();

export const ds_monUpdateManyMutationInputSchema: z.ZodType<Prisma.ds_monUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_monUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ds_monUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_mon_theo_namCreateInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateInput> = z.object({
  year: z.string(),
  semester: z.number().int(),
  ds_mon: z.lazy(() => ds_monCreateNestedOneWithoutDs_mon_theo_namInputSchema)
}).strict();

export const ds_mon_theo_namUncheckedCreateInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedCreateInput> = z.object({
  year: z.string(),
  semester: z.number().int(),
  ma_mon: z.string()
}).strict();

export const ds_mon_theo_namUpdateInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ds_mon: z.lazy(() => ds_monUpdateOneRequiredWithoutDs_mon_theo_namNestedInputSchema).optional()
}).strict();

export const ds_mon_theo_namUncheckedUpdateInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedUpdateInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ma_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ds_mon_theo_namCreateManyInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateManyInput> = z.object({
  year: z.string(),
  semester: z.number().int(),
  ma_mon: z.string()
}).strict();

export const ds_mon_theo_namUpdateManyMutationInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateManyMutationInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ds_mon_theo_namUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedUpdateManyInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ma_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ds_nhom_hocCreateInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateInput> = z.object({
  id_to_hoc: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable(),
  ds_mon: z.lazy(() => ds_monCreateNestedOneWithoutDs_nhom_hocInputSchema)
}).strict();

export const ds_nhom_hocUncheckedCreateInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedCreateInput> = z.object({
  id_to_hoc: z.string(),
  ma_mon: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable()
}).strict();

export const ds_nhom_hocUpdateInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_mon: z.lazy(() => ds_monUpdateOneRequiredWithoutDs_nhom_hocNestedInputSchema).optional()
}).strict();

export const ds_nhom_hocUncheckedUpdateInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedUpdateInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ma_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_nhom_hocCreateManyInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateManyInput> = z.object({
  id_to_hoc: z.string(),
  ma_mon: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable()
}).strict();

export const ds_nhom_hocUpdateManyMutationInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateManyMutationInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_nhom_hocUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedUpdateManyInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ma_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsCreateInputSchema: z.ZodType<Prisma.exchange_postsCreateInput> = z.object({
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
  user: z.lazy(() => userCreateNestedOneWithoutExchange_postsInputSchema),
  ds_mon: z.lazy(() => ds_monCreateNestedOneWithoutExchange_postsInputSchema)
}).strict();

export const exchange_postsUncheckedCreateInputSchema: z.ZodType<Prisma.exchange_postsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  id_mon: z.string(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  author: z.number().int(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const exchange_postsUpdateInputSchema: z.ZodType<Prisma.exchange_postsUpdateInput> = z.object({
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => userUpdateOneRequiredWithoutExchange_postsNestedInputSchema).optional(),
  ds_mon: z.lazy(() => ds_monUpdateOneRequiredWithoutExchange_postsNestedInputSchema).optional()
}).strict();

export const exchange_postsUncheckedUpdateInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsCreateManyInputSchema: z.ZodType<Prisma.exchange_postsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  id_mon: z.string(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  author: z.number().int(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const exchange_postsUpdateManyMutationInputSchema: z.ZodType<Prisma.exchange_postsUpdateManyMutationInput> = z.object({
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const userCreateInputSchema: z.ZodType<Prisma.userCreateInput> = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUncheckedCreateInputSchema: z.ZodType<Prisma.userUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const userUpdateInputSchema: z.ZodType<Prisma.userUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userUncheckedUpdateInputSchema: z.ZodType<Prisma.userUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const userCreateManyInputSchema: z.ZodType<Prisma.userCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const userUpdateManyMutationInputSchema: z.ZodType<Prisma.userUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const userUncheckedUpdateManyInputSchema: z.ZodType<Prisma.userUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Ds_nhom_hocListRelationFilterSchema: z.ZodType<Prisma.Ds_nhom_hocListRelationFilter> = z.object({
  every: z.lazy(() => ds_nhom_hocWhereInputSchema).optional(),
  some: z.lazy(() => ds_nhom_hocWhereInputSchema).optional(),
  none: z.lazy(() => ds_nhom_hocWhereInputSchema).optional()
}).strict();

export const Exchange_postsListRelationFilterSchema: z.ZodType<Prisma.Exchange_postsListRelationFilter> = z.object({
  every: z.lazy(() => exchange_postsWhereInputSchema).optional(),
  some: z.lazy(() => exchange_postsWhereInputSchema).optional(),
  none: z.lazy(() => exchange_postsWhereInputSchema).optional()
}).strict();

export const Ds_mon_theo_namListRelationFilterSchema: z.ZodType<Prisma.Ds_mon_theo_namListRelationFilter> = z.object({
  every: z.lazy(() => ds_mon_theo_namWhereInputSchema).optional(),
  some: z.lazy(() => ds_mon_theo_namWhereInputSchema).optional(),
  none: z.lazy(() => ds_mon_theo_namWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ds_nhom_hocOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const exchange_postsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.exchange_postsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_mon_theo_namOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_monOrderByRelevanceInputSchema: z.ZodType<Prisma.ds_monOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ds_monOrderByRelevanceFieldEnumSchema),z.lazy(() => ds_monOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ds_monCountOrderByAggregateInputSchema: z.ZodType<Prisma.ds_monCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display_name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_monMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ds_monMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display_name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_monMinOrderByAggregateInputSchema: z.ZodType<Prisma.ds_monMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  display_name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const Ds_monScalarRelationFilterSchema: z.ZodType<Prisma.Ds_monScalarRelationFilter> = z.object({
  is: z.lazy(() => ds_monWhereInputSchema).optional(),
  isNot: z.lazy(() => ds_monWhereInputSchema).optional()
}).strict();

export const ds_mon_theo_namOrderByRelevanceInputSchema: z.ZodType<Prisma.ds_mon_theo_namOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ds_mon_theo_namOrderByRelevanceFieldEnumSchema),z.lazy(() => ds_mon_theo_namOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ds_mon_theo_namMa_monYearSemesterCompoundUniqueInputSchema: z.ZodType<Prisma.ds_mon_theo_namMa_monYearSemesterCompoundUniqueInput> = z.object({
  ma_mon: z.string(),
  year: z.string(),
  semester: z.number()
}).strict();

export const ds_mon_theo_namCountOrderByAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namCountOrderByAggregateInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional(),
  semester: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_mon_theo_namAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namAvgOrderByAggregateInput> = z.object({
  semester: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_mon_theo_namMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namMaxOrderByAggregateInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional(),
  semester: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_mon_theo_namMinOrderByAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namMinOrderByAggregateInput> = z.object({
  year: z.lazy(() => SortOrderSchema).optional(),
  semester: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_mon_theo_namSumOrderByAggregateInputSchema: z.ZodType<Prisma.ds_mon_theo_namSumOrderByAggregateInput> = z.object({
  semester: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ds_nhom_hocOrderByRelevanceInputSchema: z.ZodType<Prisma.ds_nhom_hocOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ds_nhom_hocOrderByRelevanceFieldEnumSchema),z.lazy(() => ds_nhom_hocOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ds_nhom_hocCountOrderByAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocCountOrderByAggregateInput> = z.object({
  id_to_hoc: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  nhom: z.lazy(() => SortOrderSchema).optional(),
  nam: z.lazy(() => SortOrderSchema).optional(),
  tkb_map: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_nhom_hocAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocAvgOrderByAggregateInput> = z.object({
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  tkb_map: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_nhom_hocMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocMaxOrderByAggregateInput> = z.object({
  id_to_hoc: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  nhom: z.lazy(() => SortOrderSchema).optional(),
  nam: z.lazy(() => SortOrderSchema).optional(),
  tkb_map: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_nhom_hocMinOrderByAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocMinOrderByAggregateInput> = z.object({
  id_to_hoc: z.lazy(() => SortOrderSchema).optional(),
  ma_mon: z.lazy(() => SortOrderSchema).optional(),
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  nhom: z.lazy(() => SortOrderSchema).optional(),
  nam: z.lazy(() => SortOrderSchema).optional(),
  tkb_map: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_nhom_hocSumOrderByAggregateInputSchema: z.ZodType<Prisma.ds_nhom_hocSumOrderByAggregateInput> = z.object({
  so_tc: z.lazy(() => SortOrderSchema).optional(),
  tkb_map: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => userWhereInputSchema).optional(),
  isNot: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const exchange_postsOrderByRelevanceInputSchema: z.ZodType<Prisma.exchange_postsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => exchange_postsOrderByRelevanceFieldEnumSchema),z.lazy(() => exchange_postsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const exchange_postsCountOrderByAggregateInputSchema: z.ZodType<Prisma.exchange_postsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_mon: z.lazy(() => SortOrderSchema).optional(),
  current_section: z.lazy(() => SortOrderSchema).optional(),
  desired_section: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const exchange_postsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.exchange_postsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const exchange_postsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.exchange_postsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_mon: z.lazy(() => SortOrderSchema).optional(),
  current_section: z.lazy(() => SortOrderSchema).optional(),
  desired_section: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const exchange_postsMinOrderByAggregateInputSchema: z.ZodType<Prisma.exchange_postsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  id_mon: z.lazy(() => SortOrderSchema).optional(),
  current_section: z.lazy(() => SortOrderSchema).optional(),
  desired_section: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const exchange_postsSumOrderByAggregateInputSchema: z.ZodType<Prisma.exchange_postsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const userOrderByRelevanceInputSchema: z.ZodType<Prisma.userOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => userOrderByRelevanceFieldEnumSchema),z.lazy(() => userOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const userCountOrderByAggregateInputSchema: z.ZodType<Prisma.userCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  two_factor_secret: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userAvgOrderByAggregateInputSchema: z.ZodType<Prisma.userAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userMaxOrderByAggregateInputSchema: z.ZodType<Prisma.userMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  two_factor_secret: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userMinOrderByAggregateInputSchema: z.ZodType<Prisma.userMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  two_factor_secret: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const userSumOrderByAggregateInputSchema: z.ZodType<Prisma.userSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ds_nhom_hocCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_nhom_hocCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ds_mon_theo_namCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_mon_theo_namCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ds_nhom_hocUncheckedCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_nhom_hocCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUncheckedCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUncheckedCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ds_mon_theo_namUncheckedCreateNestedManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedCreateNestedManyWithoutDs_monInput> = z.object({
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_mon_theo_namCreateManyDs_monInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const ds_nhom_hocUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_nhom_hocCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ds_nhom_hocUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ds_nhom_hocScalarWhereInputSchema),z.lazy(() => ds_nhom_hocScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.exchange_postsUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => exchange_postsUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ds_mon_theo_namUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_mon_theo_namCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ds_nhom_hocUncheckedUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_nhom_hocCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),z.lazy(() => ds_nhom_hocWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ds_nhom_hocUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ds_nhom_hocScalarWhereInputSchema),z.lazy(() => ds_nhom_hocScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUncheckedUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => exchange_postsUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => exchange_postsUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ds_mon_theo_namUncheckedUpdateManyWithoutDs_monNestedInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedUpdateManyWithoutDs_monNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema).array(),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ds_mon_theo_namCreateManyDs_monInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ds_monCreateNestedOneWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monCreateNestedOneWithoutDs_mon_theo_namInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_mon_theo_namInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutDs_mon_theo_namInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ds_monUpdateOneRequiredWithoutDs_mon_theo_namNestedInputSchema: z.ZodType<Prisma.ds_monUpdateOneRequiredWithoutDs_mon_theo_namNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_mon_theo_namInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutDs_mon_theo_namInputSchema).optional(),
  upsert: z.lazy(() => ds_monUpsertWithoutDs_mon_theo_namInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ds_monUpdateToOneWithWhereWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUpdateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_mon_theo_namInputSchema) ]).optional(),
}).strict();

export const ds_monCreateNestedOneWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monCreateNestedOneWithoutDs_nhom_hocInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_nhom_hocInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutDs_nhom_hocInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional()
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const ds_monUpdateOneRequiredWithoutDs_nhom_hocNestedInputSchema: z.ZodType<Prisma.ds_monUpdateOneRequiredWithoutDs_nhom_hocNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_nhom_hocInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutDs_nhom_hocInputSchema).optional(),
  upsert: z.lazy(() => ds_monUpsertWithoutDs_nhom_hocInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ds_monUpdateToOneWithWhereWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUpdateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_nhom_hocInputSchema) ]).optional(),
}).strict();

export const userCreateNestedOneWithoutExchange_postsInputSchema: z.ZodType<Prisma.userCreateNestedOneWithoutExchange_postsInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedCreateWithoutExchange_postsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutExchange_postsInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional()
}).strict();

export const ds_monCreateNestedOneWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monCreateNestedOneWithoutExchange_postsInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutExchange_postsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutExchange_postsInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const userUpdateOneRequiredWithoutExchange_postsNestedInputSchema: z.ZodType<Prisma.userUpdateOneRequiredWithoutExchange_postsNestedInput> = z.object({
  create: z.union([ z.lazy(() => userCreateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedCreateWithoutExchange_postsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => userCreateOrConnectWithoutExchange_postsInputSchema).optional(),
  upsert: z.lazy(() => userUpsertWithoutExchange_postsInputSchema).optional(),
  connect: z.lazy(() => userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => userUpdateToOneWithWhereWithoutExchange_postsInputSchema),z.lazy(() => userUpdateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedUpdateWithoutExchange_postsInputSchema) ]).optional(),
}).strict();

export const ds_monUpdateOneRequiredWithoutExchange_postsNestedInputSchema: z.ZodType<Prisma.ds_monUpdateOneRequiredWithoutExchange_postsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ds_monCreateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutExchange_postsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ds_monCreateOrConnectWithoutExchange_postsInputSchema).optional(),
  upsert: z.lazy(() => ds_monUpsertWithoutExchange_postsInputSchema).optional(),
  connect: z.lazy(() => ds_monWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ds_monUpdateToOneWithWhereWithoutExchange_postsInputSchema),z.lazy(() => ds_monUpdateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutExchange_postsInputSchema) ]).optional(),
}).strict();

export const exchange_postsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsCreateWithoutUserInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsCreateWithoutUserInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.exchange_postsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsCreateWithoutUserInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => exchange_postsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => exchange_postsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const exchange_postsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsCreateWithoutUserInputSchema).array(),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema),z.lazy(() => exchange_postsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => exchange_postsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => exchange_postsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => exchange_postsWhereUniqueInputSchema),z.lazy(() => exchange_postsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => exchange_postsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => exchange_postsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => exchange_postsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const ds_nhom_hocCreateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateWithoutDs_monInput> = z.object({
  id_to_hoc: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable()
}).strict();

export const ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedCreateWithoutDs_monInput> = z.object({
  id_to_hoc: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable()
}).strict();

export const ds_nhom_hocCreateOrConnectWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateOrConnectWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_nhom_hocCreateManyDs_monInputEnvelopeSchema: z.ZodType<Prisma.ds_nhom_hocCreateManyDs_monInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ds_nhom_hocCreateManyDs_monInputSchema),z.lazy(() => ds_nhom_hocCreateManyDs_monInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const exchange_postsCreateWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsCreateWithoutDs_monInput> = z.object({
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
  user: z.lazy(() => userCreateNestedOneWithoutExchange_postsInputSchema)
}).strict();

export const exchange_postsUncheckedCreateWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUncheckedCreateWithoutDs_monInput> = z.object({
  id: z.number().int().optional(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  author: z.number().int(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const exchange_postsCreateOrConnectWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsCreateOrConnectWithoutDs_monInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const exchange_postsCreateManyDs_monInputEnvelopeSchema: z.ZodType<Prisma.exchange_postsCreateManyDs_monInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => exchange_postsCreateManyDs_monInputSchema),z.lazy(() => exchange_postsCreateManyDs_monInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ds_mon_theo_namCreateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateWithoutDs_monInput> = z.object({
  year: z.string(),
  semester: z.number().int()
}).strict();

export const ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedCreateWithoutDs_monInput> = z.object({
  year: z.string(),
  semester: z.number().int()
}).strict();

export const ds_mon_theo_namCreateOrConnectWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateOrConnectWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_mon_theo_namCreateManyDs_monInputEnvelopeSchema: z.ZodType<Prisma.ds_mon_theo_namCreateManyDs_monInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ds_mon_theo_namCreateManyDs_monInputSchema),z.lazy(() => ds_mon_theo_namCreateManyDs_monInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUpsertWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ds_nhom_hocUpdateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedUpdateWithoutDs_monInputSchema) ]),
  create: z.union([ z.lazy(() => ds_nhom_hocCreateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_nhom_hocWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ds_nhom_hocUpdateWithoutDs_monInputSchema),z.lazy(() => ds_nhom_hocUncheckedUpdateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_nhom_hocUpdateManyWithWhereWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateManyWithWhereWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_nhom_hocScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ds_nhom_hocUpdateManyMutationInputSchema),z.lazy(() => ds_nhom_hocUncheckedUpdateManyWithoutDs_monInputSchema) ]),
}).strict();

export const ds_nhom_hocScalarWhereInputSchema: z.ZodType<Prisma.ds_nhom_hocScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ds_nhom_hocScalarWhereInputSchema),z.lazy(() => ds_nhom_hocScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_nhom_hocScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_nhom_hocScalarWhereInputSchema),z.lazy(() => ds_nhom_hocScalarWhereInputSchema).array() ]).optional(),
  id_to_hoc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  so_tc: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nhom: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nam: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tkb_map: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
}).strict();

export const exchange_postsUpsertWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUpsertWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedUpdateWithoutDs_monInputSchema) ]),
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const exchange_postsUpdateWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUpdateWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => exchange_postsUpdateWithoutDs_monInputSchema),z.lazy(() => exchange_postsUncheckedUpdateWithoutDs_monInputSchema) ]),
}).strict();

export const exchange_postsUpdateManyWithWhereWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUpdateManyWithWhereWithoutDs_monInput> = z.object({
  where: z.lazy(() => exchange_postsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => exchange_postsUpdateManyMutationInputSchema),z.lazy(() => exchange_postsUncheckedUpdateManyWithoutDs_monInputSchema) ]),
}).strict();

export const exchange_postsScalarWhereInputSchema: z.ZodType<Prisma.exchange_postsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => exchange_postsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => exchange_postsScalarWhereInputSchema),z.lazy(() => exchange_postsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  id_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  current_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desired_section: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpsertWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ds_mon_theo_namUpdateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedUpdateWithoutDs_monInputSchema) ]),
  create: z.union([ z.lazy(() => ds_mon_theo_namCreateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedCreateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateWithWhereUniqueWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_mon_theo_namWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ds_mon_theo_namUpdateWithoutDs_monInputSchema),z.lazy(() => ds_mon_theo_namUncheckedUpdateWithoutDs_monInputSchema) ]),
}).strict();

export const ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateManyWithWhereWithoutDs_monInput> = z.object({
  where: z.lazy(() => ds_mon_theo_namScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ds_mon_theo_namUpdateManyMutationInputSchema),z.lazy(() => ds_mon_theo_namUncheckedUpdateManyWithoutDs_monInputSchema) ]),
}).strict();

export const ds_mon_theo_namScalarWhereInputSchema: z.ZodType<Prisma.ds_mon_theo_namScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ds_mon_theo_namScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ds_mon_theo_namScalarWhereInputSchema),z.lazy(() => ds_mon_theo_namScalarWhereInputSchema).array() ]).optional(),
  year: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  semester: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ma_mon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ds_monCreateWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monCreateWithoutDs_mon_theo_namInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocCreateNestedManyWithoutDs_monInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monUncheckedCreateWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monUncheckedCreateWithoutDs_mon_theo_namInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedCreateNestedManyWithoutDs_monInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monCreateOrConnectWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monCreateOrConnectWithoutDs_mon_theo_namInput> = z.object({
  where: z.lazy(() => ds_monWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_mon_theo_namInputSchema) ]),
}).strict();

export const ds_monUpsertWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monUpsertWithoutDs_mon_theo_namInput> = z.object({
  update: z.union([ z.lazy(() => ds_monUpdateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_mon_theo_namInputSchema) ]),
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_mon_theo_namInputSchema) ]),
  where: z.lazy(() => ds_monWhereInputSchema).optional()
}).strict();

export const ds_monUpdateToOneWithWhereWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monUpdateToOneWithWhereWithoutDs_mon_theo_namInput> = z.object({
  where: z.lazy(() => ds_monWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ds_monUpdateWithoutDs_mon_theo_namInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_mon_theo_namInputSchema) ]),
}).strict();

export const ds_monUpdateWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monUpdateWithoutDs_mon_theo_namInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUpdateManyWithoutDs_monNestedInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monUncheckedUpdateWithoutDs_mon_theo_namInputSchema: z.ZodType<Prisma.ds_monUncheckedUpdateWithoutDs_mon_theo_namInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monCreateWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monCreateWithoutDs_nhom_hocInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monUncheckedCreateWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monUncheckedCreateWithoutDs_nhom_hocInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monCreateOrConnectWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monCreateOrConnectWithoutDs_nhom_hocInput> = z.object({
  where: z.lazy(() => ds_monWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_nhom_hocInputSchema) ]),
}).strict();

export const ds_monUpsertWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monUpsertWithoutDs_nhom_hocInput> = z.object({
  update: z.union([ z.lazy(() => ds_monUpdateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_nhom_hocInputSchema) ]),
  create: z.union([ z.lazy(() => ds_monCreateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutDs_nhom_hocInputSchema) ]),
  where: z.lazy(() => ds_monWhereInputSchema).optional()
}).strict();

export const ds_monUpdateToOneWithWhereWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monUpdateToOneWithWhereWithoutDs_nhom_hocInput> = z.object({
  where: z.lazy(() => ds_monWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ds_monUpdateWithoutDs_nhom_hocInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutDs_nhom_hocInputSchema) ]),
}).strict();

export const ds_monUpdateWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monUpdateWithoutDs_nhom_hocInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monUncheckedUpdateWithoutDs_nhom_hocInputSchema: z.ZodType<Prisma.ds_monUncheckedUpdateWithoutDs_nhom_hocInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  exchange_posts: z.lazy(() => exchange_postsUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const userCreateWithoutExchange_postsInputSchema: z.ZodType<Prisma.userCreateWithoutExchange_postsInput> = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const userUncheckedCreateWithoutExchange_postsInputSchema: z.ZodType<Prisma.userUncheckedCreateWithoutExchange_postsInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  two_factor_secret: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const userCreateOrConnectWithoutExchange_postsInputSchema: z.ZodType<Prisma.userCreateOrConnectWithoutExchange_postsInput> = z.object({
  where: z.lazy(() => userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => userCreateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedCreateWithoutExchange_postsInputSchema) ]),
}).strict();

export const ds_monCreateWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monCreateWithoutExchange_postsInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monUncheckedCreateWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monUncheckedCreateWithoutExchange_postsInput> = z.object({
  id: z.string(),
  display_name: z.string().optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedCreateNestedManyWithoutDs_monInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedCreateNestedManyWithoutDs_monInputSchema).optional()
}).strict();

export const ds_monCreateOrConnectWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monCreateOrConnectWithoutExchange_postsInput> = z.object({
  where: z.lazy(() => ds_monWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ds_monCreateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutExchange_postsInputSchema) ]),
}).strict();

export const userUpsertWithoutExchange_postsInputSchema: z.ZodType<Prisma.userUpsertWithoutExchange_postsInput> = z.object({
  update: z.union([ z.lazy(() => userUpdateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedUpdateWithoutExchange_postsInputSchema) ]),
  create: z.union([ z.lazy(() => userCreateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedCreateWithoutExchange_postsInputSchema) ]),
  where: z.lazy(() => userWhereInputSchema).optional()
}).strict();

export const userUpdateToOneWithWhereWithoutExchange_postsInputSchema: z.ZodType<Prisma.userUpdateToOneWithWhereWithoutExchange_postsInput> = z.object({
  where: z.lazy(() => userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => userUpdateWithoutExchange_postsInputSchema),z.lazy(() => userUncheckedUpdateWithoutExchange_postsInputSchema) ]),
}).strict();

export const userUpdateWithoutExchange_postsInputSchema: z.ZodType<Prisma.userUpdateWithoutExchange_postsInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const userUncheckedUpdateWithoutExchange_postsInputSchema: z.ZodType<Prisma.userUncheckedUpdateWithoutExchange_postsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  two_factor_secret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_monUpsertWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monUpsertWithoutExchange_postsInput> = z.object({
  update: z.union([ z.lazy(() => ds_monUpdateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutExchange_postsInputSchema) ]),
  create: z.union([ z.lazy(() => ds_monCreateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedCreateWithoutExchange_postsInputSchema) ]),
  where: z.lazy(() => ds_monWhereInputSchema).optional()
}).strict();

export const ds_monUpdateToOneWithWhereWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monUpdateToOneWithWhereWithoutExchange_postsInput> = z.object({
  where: z.lazy(() => ds_monWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ds_monUpdateWithoutExchange_postsInputSchema),z.lazy(() => ds_monUncheckedUpdateWithoutExchange_postsInputSchema) ]),
}).strict();

export const ds_monUpdateWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monUpdateWithoutExchange_postsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const ds_monUncheckedUpdateWithoutExchange_postsInputSchema: z.ZodType<Prisma.ds_monUncheckedUpdateWithoutExchange_postsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  display_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_nhom_hoc: z.lazy(() => ds_nhom_hocUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional(),
  ds_mon_theo_nam: z.lazy(() => ds_mon_theo_namUncheckedUpdateManyWithoutDs_monNestedInputSchema).optional()
}).strict();

export const exchange_postsCreateWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsCreateWithoutUserInput> = z.object({
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
  ds_mon: z.lazy(() => ds_monCreateNestedOneWithoutExchange_postsInputSchema)
}).strict();

export const exchange_postsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  id_mon: z.string(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const exchange_postsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const exchange_postsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.exchange_postsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => exchange_postsCreateManyUserInputSchema),z.lazy(() => exchange_postsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const exchange_postsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => exchange_postsUpdateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => exchange_postsCreateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const exchange_postsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => exchange_postsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => exchange_postsUpdateWithoutUserInputSchema),z.lazy(() => exchange_postsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const exchange_postsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => exchange_postsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => exchange_postsUpdateManyMutationInputSchema),z.lazy(() => exchange_postsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ds_nhom_hocCreateManyDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocCreateManyDs_monInput> = z.object({
  id_to_hoc: z.string(),
  so_tc: z.number().int(),
  nhom: z.string().optional().nullable(),
  nam: z.string().optional().nullable(),
  tkb_map: z.bigint().optional().nullable()
}).strict();

export const exchange_postsCreateManyDs_monInputSchema: z.ZodType<Prisma.exchange_postsCreateManyDs_monInput> = z.object({
  id: z.number().int().optional(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  author: z.number().int(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const ds_mon_theo_namCreateManyDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namCreateManyDs_monInput> = z.object({
  year: z.string(),
  semester: z.number().int()
}).strict();

export const ds_nhom_hocUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUpdateWithoutDs_monInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_nhom_hocUncheckedUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedUpdateWithoutDs_monInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_nhom_hocUncheckedUpdateManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_nhom_hocUncheckedUpdateManyWithoutDs_monInput> = z.object({
  id_to_hoc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  so_tc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nhom: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nam: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tkb_map: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUpdateWithoutDs_monInput> = z.object({
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => userUpdateOneRequiredWithoutExchange_postsNestedInputSchema).optional()
}).strict();

export const exchange_postsUncheckedUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateWithoutDs_monInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsUncheckedUpdateManyWithoutDs_monInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateManyWithoutDs_monInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ds_mon_theo_namUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateWithoutDs_monInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ds_mon_theo_namUncheckedUpdateWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedUpdateWithoutDs_monInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ds_mon_theo_namUncheckedUpdateManyWithoutDs_monInputSchema: z.ZodType<Prisma.ds_mon_theo_namUncheckedUpdateManyWithoutDs_monInput> = z.object({
  year: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  semester: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const exchange_postsCreateManyUserInputSchema: z.ZodType<Prisma.exchange_postsCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  id_mon: z.string(),
  current_section: z.string(),
  desired_section: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  is_active: z.boolean().optional().nullable()
}).strict();

export const exchange_postsUpdateWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUpdateWithoutUserInput> = z.object({
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ds_mon: z.lazy(() => ds_monUpdateOneRequiredWithoutExchange_postsNestedInputSchema).optional()
}).strict();

export const exchange_postsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const exchange_postsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.exchange_postsUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  id_mon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  current_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desired_section: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ds_monFindFirstArgsSchema: z.ZodType<Prisma.ds_monFindFirstArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereInputSchema.optional(),
  orderBy: z.union([ ds_monOrderByWithRelationInputSchema.array(),ds_monOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_monWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_monScalarFieldEnumSchema,Ds_monScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_monFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ds_monFindFirstOrThrowArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereInputSchema.optional(),
  orderBy: z.union([ ds_monOrderByWithRelationInputSchema.array(),ds_monOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_monWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_monScalarFieldEnumSchema,Ds_monScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_monFindManyArgsSchema: z.ZodType<Prisma.ds_monFindManyArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereInputSchema.optional(),
  orderBy: z.union([ ds_monOrderByWithRelationInputSchema.array(),ds_monOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_monWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_monScalarFieldEnumSchema,Ds_monScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_monAggregateArgsSchema: z.ZodType<Prisma.ds_monAggregateArgs> = z.object({
  where: ds_monWhereInputSchema.optional(),
  orderBy: z.union([ ds_monOrderByWithRelationInputSchema.array(),ds_monOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_monWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_monGroupByArgsSchema: z.ZodType<Prisma.ds_monGroupByArgs> = z.object({
  where: ds_monWhereInputSchema.optional(),
  orderBy: z.union([ ds_monOrderByWithAggregationInputSchema.array(),ds_monOrderByWithAggregationInputSchema ]).optional(),
  by: Ds_monScalarFieldEnumSchema.array(),
  having: ds_monScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_monFindUniqueArgsSchema: z.ZodType<Prisma.ds_monFindUniqueArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereUniqueInputSchema,
}).strict() ;

export const ds_monFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ds_monFindUniqueOrThrowArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereUniqueInputSchema,
}).strict() ;

export const ds_mon_theo_namFindFirstArgsSchema: z.ZodType<Prisma.ds_mon_theo_namFindFirstArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereInputSchema.optional(),
  orderBy: z.union([ ds_mon_theo_namOrderByWithRelationInputSchema.array(),ds_mon_theo_namOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_mon_theo_namWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_mon_theo_namScalarFieldEnumSchema,Ds_mon_theo_namScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_mon_theo_namFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ds_mon_theo_namFindFirstOrThrowArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereInputSchema.optional(),
  orderBy: z.union([ ds_mon_theo_namOrderByWithRelationInputSchema.array(),ds_mon_theo_namOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_mon_theo_namWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_mon_theo_namScalarFieldEnumSchema,Ds_mon_theo_namScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_mon_theo_namFindManyArgsSchema: z.ZodType<Prisma.ds_mon_theo_namFindManyArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereInputSchema.optional(),
  orderBy: z.union([ ds_mon_theo_namOrderByWithRelationInputSchema.array(),ds_mon_theo_namOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_mon_theo_namWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_mon_theo_namScalarFieldEnumSchema,Ds_mon_theo_namScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_mon_theo_namAggregateArgsSchema: z.ZodType<Prisma.ds_mon_theo_namAggregateArgs> = z.object({
  where: ds_mon_theo_namWhereInputSchema.optional(),
  orderBy: z.union([ ds_mon_theo_namOrderByWithRelationInputSchema.array(),ds_mon_theo_namOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_mon_theo_namWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_mon_theo_namGroupByArgsSchema: z.ZodType<Prisma.ds_mon_theo_namGroupByArgs> = z.object({
  where: ds_mon_theo_namWhereInputSchema.optional(),
  orderBy: z.union([ ds_mon_theo_namOrderByWithAggregationInputSchema.array(),ds_mon_theo_namOrderByWithAggregationInputSchema ]).optional(),
  by: Ds_mon_theo_namScalarFieldEnumSchema.array(),
  having: ds_mon_theo_namScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_mon_theo_namFindUniqueArgsSchema: z.ZodType<Prisma.ds_mon_theo_namFindUniqueArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereUniqueInputSchema,
}).strict() ;

export const ds_mon_theo_namFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ds_mon_theo_namFindUniqueOrThrowArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereUniqueInputSchema,
}).strict() ;

export const ds_nhom_hocFindFirstArgsSchema: z.ZodType<Prisma.ds_nhom_hocFindFirstArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereInputSchema.optional(),
  orderBy: z.union([ ds_nhom_hocOrderByWithRelationInputSchema.array(),ds_nhom_hocOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_nhom_hocWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_nhom_hocScalarFieldEnumSchema,Ds_nhom_hocScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_nhom_hocFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ds_nhom_hocFindFirstOrThrowArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereInputSchema.optional(),
  orderBy: z.union([ ds_nhom_hocOrderByWithRelationInputSchema.array(),ds_nhom_hocOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_nhom_hocWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_nhom_hocScalarFieldEnumSchema,Ds_nhom_hocScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_nhom_hocFindManyArgsSchema: z.ZodType<Prisma.ds_nhom_hocFindManyArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereInputSchema.optional(),
  orderBy: z.union([ ds_nhom_hocOrderByWithRelationInputSchema.array(),ds_nhom_hocOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_nhom_hocWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Ds_nhom_hocScalarFieldEnumSchema,Ds_nhom_hocScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ds_nhom_hocAggregateArgsSchema: z.ZodType<Prisma.ds_nhom_hocAggregateArgs> = z.object({
  where: ds_nhom_hocWhereInputSchema.optional(),
  orderBy: z.union([ ds_nhom_hocOrderByWithRelationInputSchema.array(),ds_nhom_hocOrderByWithRelationInputSchema ]).optional(),
  cursor: ds_nhom_hocWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_nhom_hocGroupByArgsSchema: z.ZodType<Prisma.ds_nhom_hocGroupByArgs> = z.object({
  where: ds_nhom_hocWhereInputSchema.optional(),
  orderBy: z.union([ ds_nhom_hocOrderByWithAggregationInputSchema.array(),ds_nhom_hocOrderByWithAggregationInputSchema ]).optional(),
  by: Ds_nhom_hocScalarFieldEnumSchema.array(),
  having: ds_nhom_hocScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ds_nhom_hocFindUniqueArgsSchema: z.ZodType<Prisma.ds_nhom_hocFindUniqueArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereUniqueInputSchema,
}).strict() ;

export const ds_nhom_hocFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ds_nhom_hocFindUniqueOrThrowArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereUniqueInputSchema,
}).strict() ;

export const exchange_postsFindFirstArgsSchema: z.ZodType<Prisma.exchange_postsFindFirstArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereInputSchema.optional(),
  orderBy: z.union([ exchange_postsOrderByWithRelationInputSchema.array(),exchange_postsOrderByWithRelationInputSchema ]).optional(),
  cursor: exchange_postsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Exchange_postsScalarFieldEnumSchema,Exchange_postsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const exchange_postsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.exchange_postsFindFirstOrThrowArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereInputSchema.optional(),
  orderBy: z.union([ exchange_postsOrderByWithRelationInputSchema.array(),exchange_postsOrderByWithRelationInputSchema ]).optional(),
  cursor: exchange_postsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Exchange_postsScalarFieldEnumSchema,Exchange_postsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const exchange_postsFindManyArgsSchema: z.ZodType<Prisma.exchange_postsFindManyArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereInputSchema.optional(),
  orderBy: z.union([ exchange_postsOrderByWithRelationInputSchema.array(),exchange_postsOrderByWithRelationInputSchema ]).optional(),
  cursor: exchange_postsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Exchange_postsScalarFieldEnumSchema,Exchange_postsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const exchange_postsAggregateArgsSchema: z.ZodType<Prisma.exchange_postsAggregateArgs> = z.object({
  where: exchange_postsWhereInputSchema.optional(),
  orderBy: z.union([ exchange_postsOrderByWithRelationInputSchema.array(),exchange_postsOrderByWithRelationInputSchema ]).optional(),
  cursor: exchange_postsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const exchange_postsGroupByArgsSchema: z.ZodType<Prisma.exchange_postsGroupByArgs> = z.object({
  where: exchange_postsWhereInputSchema.optional(),
  orderBy: z.union([ exchange_postsOrderByWithAggregationInputSchema.array(),exchange_postsOrderByWithAggregationInputSchema ]).optional(),
  by: Exchange_postsScalarFieldEnumSchema.array(),
  having: exchange_postsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const exchange_postsFindUniqueArgsSchema: z.ZodType<Prisma.exchange_postsFindUniqueArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereUniqueInputSchema,
}).strict() ;

export const exchange_postsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.exchange_postsFindUniqueOrThrowArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereUniqueInputSchema,
}).strict() ;

export const userFindFirstArgsSchema: z.ZodType<Prisma.userFindFirstArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userFindFirstOrThrowArgsSchema: z.ZodType<Prisma.userFindFirstOrThrowArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userFindManyArgsSchema: z.ZodType<Prisma.userFindManyArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const userAggregateArgsSchema: z.ZodType<Prisma.userAggregateArgs> = z.object({
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithRelationInputSchema.array(),userOrderByWithRelationInputSchema ]).optional(),
  cursor: userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userGroupByArgsSchema: z.ZodType<Prisma.userGroupByArgs> = z.object({
  where: userWhereInputSchema.optional(),
  orderBy: z.union([ userOrderByWithAggregationInputSchema.array(),userOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: userScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const userFindUniqueArgsSchema: z.ZodType<Prisma.userFindUniqueArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.userFindUniqueOrThrowArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const ds_monCreateArgsSchema: z.ZodType<Prisma.ds_monCreateArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  data: z.union([ ds_monCreateInputSchema,ds_monUncheckedCreateInputSchema ]),
}).strict() ;

export const ds_monUpsertArgsSchema: z.ZodType<Prisma.ds_monUpsertArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereUniqueInputSchema,
  create: z.union([ ds_monCreateInputSchema,ds_monUncheckedCreateInputSchema ]),
  update: z.union([ ds_monUpdateInputSchema,ds_monUncheckedUpdateInputSchema ]),
}).strict() ;

export const ds_monCreateManyArgsSchema: z.ZodType<Prisma.ds_monCreateManyArgs> = z.object({
  data: z.union([ ds_monCreateManyInputSchema,ds_monCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ds_monDeleteArgsSchema: z.ZodType<Prisma.ds_monDeleteArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  where: ds_monWhereUniqueInputSchema,
}).strict() ;

export const ds_monUpdateArgsSchema: z.ZodType<Prisma.ds_monUpdateArgs> = z.object({
  select: ds_monSelectSchema.optional(),
  include: ds_monIncludeSchema.optional(),
  data: z.union([ ds_monUpdateInputSchema,ds_monUncheckedUpdateInputSchema ]),
  where: ds_monWhereUniqueInputSchema,
}).strict() ;

export const ds_monUpdateManyArgsSchema: z.ZodType<Prisma.ds_monUpdateManyArgs> = z.object({
  data: z.union([ ds_monUpdateManyMutationInputSchema,ds_monUncheckedUpdateManyInputSchema ]),
  where: ds_monWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ds_monDeleteManyArgsSchema: z.ZodType<Prisma.ds_monDeleteManyArgs> = z.object({
  where: ds_monWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ds_mon_theo_namCreateArgsSchema: z.ZodType<Prisma.ds_mon_theo_namCreateArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  data: z.union([ ds_mon_theo_namCreateInputSchema,ds_mon_theo_namUncheckedCreateInputSchema ]),
}).strict() ;

export const ds_mon_theo_namUpsertArgsSchema: z.ZodType<Prisma.ds_mon_theo_namUpsertArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereUniqueInputSchema,
  create: z.union([ ds_mon_theo_namCreateInputSchema,ds_mon_theo_namUncheckedCreateInputSchema ]),
  update: z.union([ ds_mon_theo_namUpdateInputSchema,ds_mon_theo_namUncheckedUpdateInputSchema ]),
}).strict() ;

export const ds_mon_theo_namCreateManyArgsSchema: z.ZodType<Prisma.ds_mon_theo_namCreateManyArgs> = z.object({
  data: z.union([ ds_mon_theo_namCreateManyInputSchema,ds_mon_theo_namCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ds_mon_theo_namDeleteArgsSchema: z.ZodType<Prisma.ds_mon_theo_namDeleteArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  where: ds_mon_theo_namWhereUniqueInputSchema,
}).strict() ;

export const ds_mon_theo_namUpdateArgsSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateArgs> = z.object({
  select: ds_mon_theo_namSelectSchema.optional(),
  include: ds_mon_theo_namIncludeSchema.optional(),
  data: z.union([ ds_mon_theo_namUpdateInputSchema,ds_mon_theo_namUncheckedUpdateInputSchema ]),
  where: ds_mon_theo_namWhereUniqueInputSchema,
}).strict() ;

export const ds_mon_theo_namUpdateManyArgsSchema: z.ZodType<Prisma.ds_mon_theo_namUpdateManyArgs> = z.object({
  data: z.union([ ds_mon_theo_namUpdateManyMutationInputSchema,ds_mon_theo_namUncheckedUpdateManyInputSchema ]),
  where: ds_mon_theo_namWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ds_mon_theo_namDeleteManyArgsSchema: z.ZodType<Prisma.ds_mon_theo_namDeleteManyArgs> = z.object({
  where: ds_mon_theo_namWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ds_nhom_hocCreateArgsSchema: z.ZodType<Prisma.ds_nhom_hocCreateArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  data: z.union([ ds_nhom_hocCreateInputSchema,ds_nhom_hocUncheckedCreateInputSchema ]),
}).strict() ;

export const ds_nhom_hocUpsertArgsSchema: z.ZodType<Prisma.ds_nhom_hocUpsertArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereUniqueInputSchema,
  create: z.union([ ds_nhom_hocCreateInputSchema,ds_nhom_hocUncheckedCreateInputSchema ]),
  update: z.union([ ds_nhom_hocUpdateInputSchema,ds_nhom_hocUncheckedUpdateInputSchema ]),
}).strict() ;

export const ds_nhom_hocCreateManyArgsSchema: z.ZodType<Prisma.ds_nhom_hocCreateManyArgs> = z.object({
  data: z.union([ ds_nhom_hocCreateManyInputSchema,ds_nhom_hocCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ds_nhom_hocDeleteArgsSchema: z.ZodType<Prisma.ds_nhom_hocDeleteArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  where: ds_nhom_hocWhereUniqueInputSchema,
}).strict() ;

export const ds_nhom_hocUpdateArgsSchema: z.ZodType<Prisma.ds_nhom_hocUpdateArgs> = z.object({
  select: ds_nhom_hocSelectSchema.optional(),
  include: ds_nhom_hocIncludeSchema.optional(),
  data: z.union([ ds_nhom_hocUpdateInputSchema,ds_nhom_hocUncheckedUpdateInputSchema ]),
  where: ds_nhom_hocWhereUniqueInputSchema,
}).strict() ;

export const ds_nhom_hocUpdateManyArgsSchema: z.ZodType<Prisma.ds_nhom_hocUpdateManyArgs> = z.object({
  data: z.union([ ds_nhom_hocUpdateManyMutationInputSchema,ds_nhom_hocUncheckedUpdateManyInputSchema ]),
  where: ds_nhom_hocWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ds_nhom_hocDeleteManyArgsSchema: z.ZodType<Prisma.ds_nhom_hocDeleteManyArgs> = z.object({
  where: ds_nhom_hocWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const exchange_postsCreateArgsSchema: z.ZodType<Prisma.exchange_postsCreateArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  data: z.union([ exchange_postsCreateInputSchema,exchange_postsUncheckedCreateInputSchema ]),
}).strict() ;

export const exchange_postsUpsertArgsSchema: z.ZodType<Prisma.exchange_postsUpsertArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereUniqueInputSchema,
  create: z.union([ exchange_postsCreateInputSchema,exchange_postsUncheckedCreateInputSchema ]),
  update: z.union([ exchange_postsUpdateInputSchema,exchange_postsUncheckedUpdateInputSchema ]),
}).strict() ;

export const exchange_postsCreateManyArgsSchema: z.ZodType<Prisma.exchange_postsCreateManyArgs> = z.object({
  data: z.union([ exchange_postsCreateManyInputSchema,exchange_postsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const exchange_postsDeleteArgsSchema: z.ZodType<Prisma.exchange_postsDeleteArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  where: exchange_postsWhereUniqueInputSchema,
}).strict() ;

export const exchange_postsUpdateArgsSchema: z.ZodType<Prisma.exchange_postsUpdateArgs> = z.object({
  select: exchange_postsSelectSchema.optional(),
  include: exchange_postsIncludeSchema.optional(),
  data: z.union([ exchange_postsUpdateInputSchema,exchange_postsUncheckedUpdateInputSchema ]),
  where: exchange_postsWhereUniqueInputSchema,
}).strict() ;

export const exchange_postsUpdateManyArgsSchema: z.ZodType<Prisma.exchange_postsUpdateManyArgs> = z.object({
  data: z.union([ exchange_postsUpdateManyMutationInputSchema,exchange_postsUncheckedUpdateManyInputSchema ]),
  where: exchange_postsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const exchange_postsDeleteManyArgsSchema: z.ZodType<Prisma.exchange_postsDeleteManyArgs> = z.object({
  where: exchange_postsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userCreateArgsSchema: z.ZodType<Prisma.userCreateArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  data: z.union([ userCreateInputSchema,userUncheckedCreateInputSchema ]),
}).strict() ;

export const userUpsertArgsSchema: z.ZodType<Prisma.userUpsertArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
  create: z.union([ userCreateInputSchema,userUncheckedCreateInputSchema ]),
  update: z.union([ userUpdateInputSchema,userUncheckedUpdateInputSchema ]),
}).strict() ;

export const userCreateManyArgsSchema: z.ZodType<Prisma.userCreateManyArgs> = z.object({
  data: z.union([ userCreateManyInputSchema,userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const userDeleteArgsSchema: z.ZodType<Prisma.userDeleteArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userUpdateArgsSchema: z.ZodType<Prisma.userUpdateArgs> = z.object({
  select: userSelectSchema.optional(),
  include: userIncludeSchema.optional(),
  data: z.union([ userUpdateInputSchema,userUncheckedUpdateInputSchema ]),
  where: userWhereUniqueInputSchema,
}).strict() ;

export const userUpdateManyArgsSchema: z.ZodType<Prisma.userUpdateManyArgs> = z.object({
  data: z.union([ userUpdateManyMutationInputSchema,userUncheckedUpdateManyInputSchema ]),
  where: userWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const userDeleteManyArgsSchema: z.ZodType<Prisma.userDeleteManyArgs> = z.object({
  where: userWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;