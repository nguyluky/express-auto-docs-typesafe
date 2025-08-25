import { Request } from 'express';

// Enum để biểu diễn các loại security scheme
export enum SecuritySchemeType {
  HTTP = 'http',
  API_KEY = 'apiKey',
  OAUTH2 = 'oauth2',
  OPENID_CONNECT = 'openIdConnect',
}

// Enum cho vị trí của API Key
export enum ApiKeyIn {
  HEADER = 'header',
  QUERY = 'query',
  COOKIE = 'cookie',
}

// Enum cho các scheme của HTTP
export enum HttpScheme {
  BASIC = 'basic',
  BEARER = 'bearer',
}

// Enum cho các loại flow của OAuth2
export enum OAuth2FlowType {
  IMPLICIT = 'implicit',
  PASSWORD = 'password',
  CLIENT_CREDENTIALS = 'clientCredentials',
  AUTHORIZATION_CODE = 'authorizationCode',
}

// Interface cho OAuth2 Scopes
interface OAuth2Scopes {
  [key: string]: string;
}

// Interface cho OAuth2 Flow
interface OAuth2Flow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: OAuth2Scopes;
}

// Interface cho OAuth2 Flows
interface OAuth2Flows {
  implicit?: OAuth2Flow;
  password?: OAuth2Flow;
  clientCredentials?: OAuth2Flow;
  authorizationCode?: OAuth2Flow;
}

// Abstract base class cho SecurityScheme
abstract class SecurityScheme {
  type: SecuritySchemeType;
  description?: string;

  constructor(type: SecuritySchemeType, description?: string) {
    this.type = type;
    this.description = description;
  }

  // Phương thức trừu tượng validate
  abstract validate(req: Request): Promise<any | null>;

  // Phương thức trừu tượng validated để xác thực với token
  abstract validated(token: string): Promise<any | null>;
}

// Class cho HTTP Security Scheme
class HttpSecurityScheme extends SecurityScheme {
  scheme: HttpScheme;
  bearerFormat?: string;

  constructor(scheme: HttpScheme, bearerFormat?: string, description?: string) {
    super(SecuritySchemeType.HTTP, description);
    this.scheme = scheme;
    this.bearerFormat = bearerFormat;
  }

  async validate(req: Request): Promise<any | null> {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    if (this.scheme === HttpScheme.BASIC) {
      const base64Credentials = authHeader.split(' ')[1];
      if (!base64Credentials) return false;
      return this.validated(base64Credentials);
    } else if (this.scheme === HttpScheme.BEARER) {
      const token = authHeader.split(' ')[1];
      if (!token) return false;
      return this.validated(token);
    }
    return false;
  }

  async validated(token: string): Promise<any | null> {
    if (this.scheme === HttpScheme.BASIC) {
      const credentials = Buffer.from(token, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
      // Ví dụ: Kiểm tra username và password (thay bằng logic thực tế)
      return username === 'admin' && password === 'secret';
    } else if (this.scheme === HttpScheme.BEARER) {
      // Ví dụ: Kiểm tra JWT hoặc token (thay bằng logic thực tế, ví dụ dùng jsonwebtoken)
      return token === 'valid_token'; // Giả lập kiểm tra
    }
    return false;
  }
}

// Class cho API Key Security Scheme
class ApiKeySecurityScheme extends SecurityScheme {
  in: ApiKeyIn;
  name: string;

  constructor(inLocation: ApiKeyIn, name: string, description?: string) {
    super(SecuritySchemeType.API_KEY, description);
    this.in = inLocation;
    this.name = name;
  }

  async validate(req: Request): Promise<any | null> {
    let apiKey: string | undefined;
    if (this.in === ApiKeyIn.HEADER) {
      apiKey = req.headers[this.name.toLowerCase()] as string;
    } else if (this.in === ApiKeyIn.QUERY) {
      apiKey = req.query[this.name] as string;
    } else if (this.in === ApiKeyIn.COOKIE) {
      apiKey = req.cookies[this.name];
    }
    if (!apiKey) return false;
    return this.validated(apiKey);
  }

  async validated(token: string): Promise<any | null> {
    // Ví dụ: Kiểm tra API Key (thay bằng logic thực tế)
    return token === 'abc123';
  }
}

// Class cho OAuth2 Security Scheme
class OAuth2SecurityScheme extends SecurityScheme {
  flows: OAuth2Flows;

  constructor(flows: OAuth2Flows, description?: string) {
    super(SecuritySchemeType.OAUTH2, description);
    this.flows = flows;
  }

  async validate(req: Request): Promise<any | null> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    const token = authHeader.split(' ')[1];
    return this.validated(token);
  }

  async validated(token: string): Promise<any | null> {
    // Ví dụ: Kiểm tra OAuth2 token (thay bằng logic thực tế, ví dụ gọi token introspection endpoint)
    return token === 'valid_oauth_token'; // Giả lập kiểm tra
  }
}

// Class cho OpenID Connect Security Scheme
class OpenIdConnectSecurityScheme extends SecurityScheme {
  openIdConnectUrl: string;

  constructor(openIdConnectUrl: string, description?: string) {
    super(SecuritySchemeType.OPENID_CONNECT, description);
    this.openIdConnectUrl = openIdConnectUrl;
  }

  async validate(req: Request): Promise<any | null> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    const token = authHeader.split(' ')[1];
    return this.validated(token);
  }

  async validated(token: string): Promise<any | null> {
    // Ví dụ: Kiểm tra OpenID Connect token (thay bằng logic thực tế, ví dụ gọi OpenID Connect provider)
    return token === 'valid_openid_token'; // Giả lập kiểm tra
  }
}

// Export middleware và security schemes để sử dụng
export { ApiKeySecurityScheme, HttpSecurityScheme, OAuth2SecurityScheme, OpenIdConnectSecurityScheme, SecurityScheme };
