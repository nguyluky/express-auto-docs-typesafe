# REST API Auto-Documentation System

Hệ thống tự động tạo REST API documentation và validation sử dụng TypeScript decorators.

## 🚀 Tính năng

- **Decorator-based**: Sử dụng decorators để định nghĩa HTTP endpoints
- **Type-safe**: Validation với Zod schemas
- **Auto-generation**: Tự động tạo Express router, Swagger docs
- **Multiple Auth**: Hỗ trợ Bearer Token, API Key, OAuth2
- **Schema Validation**: Automatic request/response validation
- **Code Generation**: Scripts tự động tạo modules và endpoints

## 📖 Cách sử dụng

### 1. Tạo REST Controller

```typescript
import { Get, Post, Put, Delete, useAuth, Summary, Description, Tags } from "@lib/httpMethod";
import { Validate, HttpResp } from "@lib/validate";
import { HttpSecurityScheme, HttpScheme } from "@lib/BaseAuth";

// Define auth scheme
const bearerAuth = new HttpSecurityScheme(HttpScheme.BEARER, 'JWT', 'Bearer token authentication');

export class UserController {
    
    @Get('/profile/:id')
    @useAuth(bearerAuth)
    @Tags(['Users'])
    @Summary('Get user profile by ID')
    @Description('Retrieve detailed user profile information')
    @Validate({
        param: GetUserByIdRequest,
        res: HttpResp<GetUserByIdResponse>
    })
    async getUserProfile(req: Request, next: NextFunction) {
        const { id } = req.params;
        const user = await this.userService.getById(id);
        return new HttpResp({ user, status: 'success' });
    }
    
    @Post('/follow')
    @useAuth(bearerAuth)
    @Tags(['Users', 'Social'])
    @Summary('Follow a user')
    @Validate({
        body: FollowUserRequest,
        res: HttpResp<FollowUserResponse>
    })
    async followUser(req: Request, next: NextFunction) {
        const { userId } = req.body;
        const currentUser = req.user;
        const result = await this.userService.followUser(currentUser.id, userId);
        return new HttpResp(result);
    }
    
    @Get('/search')
    @Tags(['Users'])
    @Summary('Search users')
    @Validate({
        query: SearchUsersRequest,
        res: HttpResp<SearchUsersResponse>
    })
    async searchUsers(req: Request, next: NextFunction) {
        const { query, limit, offset } = req.query;
        const users = await this.userService.searchUsers(query, limit, offset);
        return new HttpResp({ users, total: users.length });
    }
}
```

### 2. Định nghĩa Schema với Decorators

```typescript
import { IsString, IsNumber, IsBoolean, IsObject, IsArray, Formats } from "@lib/type_declaration";

export class GetUserByIdRequest {
    @IsString({ optional: false })
    id: string;
}

export class GetUserByIdResponse {
    @IsObject(User)
    user: User;
    
    @IsString()
    status: string;
}

export class User {
    @IsString()
    id: string;
    
    @IsString({ format: Formats.email })
    email: string;
    
    @IsString({ minLength: 2, maxLength: 50 })
    username: string;
    
    @IsString({ optional: true })
    bio?: string;
    
    @IsNumber({ min: 0 })
    followersCount: number;
    
    @IsBoolean({ optional: true })
    isVerified?: boolean;
    
    @IsArray(z.string(), { optional: true })
    tags?: string[];
}

export class FollowUserRequest {
    @IsString()
    userId: string;
}

export class SearchUsersRequest {
    @IsString({ minLength: 1 })
    query: string;
    
    @IsNumber({ min: 1, max: 100, optional: true, coerce: true })
    limit?: number;
    
    @IsNumber({ min: 0, optional: true, coerce: true })
    offset?: number;
}
```

### 3. Authentication Schemes

```typescript
import { 
    HttpSecurityScheme, 
    ApiKeySecurityScheme, 
    OAuth2SecurityScheme,
    HttpScheme,
    ApiKeyIn,
    OAuth2FlowType 
} from "@lib/BaseAuth";

// Bearer Token Authentication
const bearerAuth = new HttpSecurityScheme(HttpScheme.BEARER, 'JWT');

// API Key Authentication
const apiKeyAuth = new ApiKeySecurityScheme(ApiKeyIn.HEADER, 'X-API-Key');

// OAuth2 Authentication
const oauth2Auth = new OAuth2SecurityScheme({
    authorizationCode: {
        authorizationUrl: 'https://example.com/oauth/authorize',
        tokenUrl: 'https://example.com/oauth/token',
        scopes: {
            'read:users': 'Read user information',
            'write:users': 'Modify user information'
        }
    }
});

// Sử dụng trong controller
@useAuth(bearerAuth)
@useAuth(apiKeyAuth) // Multiple auth schemes
```

### 4. Code Generation Scripts

```bash
# Tạo module mới hoàn chỉnh
npm run generate-module users

# Thêm endpoint vào module có sẵn
npm run add-endpoint users GetUserById

```

## 📁 Generated Files Structure

Khi chạy `npm run generate-module users`, sẽ tạo:

```
src/module/users/
├── controller.ts       # REST Controller với decorators
├── service.ts         # Business logic
└── types/
    ├── getById.type.ts
    ├── search.type.ts
    ├── follow.type.ts
    └── index.ts
```

## 🔧 Decorator Reference

### HTTP Method Decorators

```typescript
@Get(path?: string)      // GET request
@Post(path?: string)     // POST request  
@Put(path?: string)      // PUT request
@Delete(path?: string)   // DELETE request
@Use(path?: string)      // Middleware
```

### Authentication Decorators

```typescript
@useAuth(securityScheme: SecurityScheme)
```

### Documentation Decorators

```typescript
@Tags(['Users', 'Admin'])           // Swagger tags
@Summary('Short description')        // API summary
@Description('Detailed description') // API description
```

### Validation Decorators

```typescript
@Validate({
    body?: Class | Class[],    // Request body validation
    param?: Class | Class[],   // URL parameters validation  
    query?: Class | Class[],   // Query parameters validation
    res?: HttpResp | HttpResp[] // Response schema documentation
})
```

### Schema Property Decorators

```typescript
@IsString(options?: StringOptions)
@IsNumber(options?: NumberOptions)
@IsBoolean(options?: BooleanOptions)
@IsArray(itemSchema: ZodType, options?: ArrayOptions)
@IsObject(targetClass: Class, options?: ObjectOptions)
@IsEnum(options: EnumOptions)
@IsFile(options?: FileOptions)
```

### Advanced Schema Options

```typescript
// String options
@IsString({
    minLength: 5,
    maxLength: 100,
    format: Formats.email,
    optional: true
})

// Number options  
@IsNumber({
    min: 0,
    max: 999,
    optional: false,
    coerce: true // Tự động convert string to number
})

// Array options
@IsArray(z.string(), {
    minItems: 1,
    maxItems: 10,
    optional: true
})
```

## 🎯 Request Lifecycle

1. **Route Matching**: Express router được auto-generate từ decorators
2. **Authentication**: Validate security schemes nếu có `@useAuth`
3. **Request Validation**: Validate body/param/query theo `@Validate` schema
4. **Controller Execution**: Chạy business logic trong controller method
5. **Response Formatting**: Format response theo `HttpResp` schema
6. **Error Handling**: Global error handler cho validation và runtime errors

## 📊 Integration với Business Logic

### Service Layer

```typescript
export class UserService {
    constructor(private prisma: PrismaClient) {}
    
    async getById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { _count: { select: { followers: true } } }
        });
        
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        return {
            ...user,
            followersCount: user._count.followers
        };
    }
    
    async followUser(followerId: string, followingId: string) {
        // Validation
        if (followerId === followingId) {
            throw new BadRequestError('Cannot follow yourself');
        }
        
        // Create follow relationship
        await this.prisma.follow.create({
            data: { followerId, followingId }
        });
        
        return { success: true, message: 'User followed successfully' };
    }
}
```

### Error Handling

```typescript
import { ZodBadRequestError, NotFoundError, UnauthorizedError } from '@utils/exception';

// Custom errors sẽ được tự động format
export class ValidationError extends ZodBadRequestError {
    constructor(zodError: ZodError) {
        super(zodError);
    }
}

// Global error middleware tự động handle
app.use((error, req, res, next) => {
    if (error instanceof ZodBadRequestError) {
        return res.status(400).json({
            error: 'Validation failed',
            details: error.details
        });
    }
    // ... other error types
});
```

## 🔍 Advanced Features

### Middleware Integration

```typescript
import { rateLimitMiddleware, corsMiddleware } from '@middleware';

export class UserController {
    @Get('/profile')
    @Middleware(rateLimitMiddleware(100, '1h')) // 100 requests per hour
    @Middleware(corsMiddleware)
    @useAuth(bearerAuth)
    async getProfile(req: Request, next: NextFunction) {
        // Implementation
    }
}
```

### File Upload

```typescript
import { upload } from '@config/multer';

export class MediaController {
    @Post('/upload')
    @Middleware(upload.single('video'))
    @useAuth(bearerAuth)
    @Validate({
        body: UploadVideoRequest,
        res: HttpResp<UploadVideoResponse>
    })
    async uploadVideo(req: Request, next: NextFunction) {
        const file = req.file;
        const { title, description } = req.body;
        
        // Upload to Cloudinary
        const result = await this.mediaService.uploadVideo(file, title, description);
        return new HttpResp(result);
    }
}
```

### Request Context & User Access

```typescript
import { RequestWithUser } from '@lib/toRouter';

export class PostController {
    @Post('/create')
    @useAuth(bearerAuth)
    async createPost(req: RequestWithUser, next: NextFunction) {
        // req.user automatically populated by auth middleware
        const userId = req.user.id;
        const { content } = req.body;
        
        const post = await this.postService.create(userId, content);
        return new HttpResp({ post });
    }
}
```

## 📚 Generated Documentation

### Swagger/OpenAPI Spec

System tự động tạo `swagger.json` với:

1. **API Info**: Title, description, version
2. **Security Schemes**: All defined auth methods
3. **Paths**: All endpoints với full documentation
4. **Schemas**: Request/response schemas
5. **Examples**: Sample requests và responses

### Access Documentation

```bash
# Start server
npm run start

# Open Swagger UI
http://localhost:3000/api-docs
```

## 🚀 Best Practices

1. **Naming Conventions**: 
   - Controllers: `UserController`, `VideoController`
   - Endpoints: PascalCase method names
   - Routes: kebab-case paths

2. **Schema Design**:
   - Separate request/response classes
   - Use descriptive class names
   - Apply proper validation rules

3. **Error Handling**:
   - Use specific error types
   - Provide meaningful error messages
   - Include validation details

4. **Authentication**:
   - Define auth schemes once, reuse everywhere
   - Document required permissions
   - Handle auth failures gracefully

5. **Documentation**:
   - Always add `@Summary` and `@Description`
   - Use meaningful `@Tags`
   - Provide request/response examples

## 🔧 Development Workflow

```bash
# Install dependencies
npm install

# Generate new module
npm run generate-module products

# Add endpoint to existing module
npm run add-endpoint products GetProductById

# Start development server
npm run start:dev

# Build for production
npm run build

# Generate updated documentation
npm run generate:docs
```

## 📝 Example Generated Swagger

```yaml
paths:
  /api/users/profile/{id}:
    get:
      tags: ['Users']
      summary: 'Get user profile by ID'
      description: 'Retrieve detailed user profile information'
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        200:
          description: 'User profile retrieved successfully'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetUserByIdResponse'
        404:
          description: 'User not found'
```

## 🎯 Module Generation Output

Running `npm run generate-module videos` creates:

```typescript
// src/module/videos/controller.ts
export class VideoController {
    @Get('/')
    @Tags(['Videos'])
    @Summary('Get videos feed')
    async getVideosFeed(req: Request, next: NextFunction) {
        // Auto-generated template
    }
    
    @Post('/')
    @useAuth(bearerAuth)
    @Tags(['Videos'])
    @Summary('Upload new video')
    async uploadVideo(req: Request, next: NextFunction) {
        // Auto-generated template
    }
}

// src/module/videos/service.ts
export class VideoService {
    constructor(private prisma: PrismaClient) {}
    
    async getVideosFeed() {
        // Auto-generated template
    }
}

// src/module/videos/types/getVideosFeed.type.ts
export class GetVideosFeedRequest {
    @IsNumber({ optional: true, coerce: true })
    page?: number;
    
    @IsNumber({ optional: true, coerce: true })
    limit?: number;
}

export class GetVideosFeedResponse {
    @IsArray(Video)
    videos: Video[];
    
    @IsNumber()
    total: number;
}
```

Hệ thống này giúp bạn xây dựng REST API với documentation luôn sync, type-safe validation, và minimal boilerplate! 🎉
