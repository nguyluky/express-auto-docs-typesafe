
import { Get, IsAuth, Post } from '@lib/httpMethod'
import { Validate } from '@lib/validate'
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '@utils/exception'
import { generateAccessToken, generateEmailToken, generateRefreshToken, generateTempToken, verifyEmailToken, verifyRefreshToken, verifyTempToken } from '@utils/jwt'
import { Logger } from '@utils/logger'
import prisma from 'config/prisma.config'
import { enable2fa, sendEmailVerify, verify2fa } from './service'
import * as Enable2faType from './types/enable2fa.type'
import * as LoginType from './types/login.type'
import * as RegisterType from './types/register.type'
import * as VerifyEmail from "./types/verifyEmail.type"
import * as Confirm2faType from './types/confirm2fa.type'
import * as Verify2faType from './types/verify2fa.type'
import * as RefreshTokenType from './types/refresh-token.type'


const logger = new Logger("Auth");

export default class AuthController {
    @Post()
    @Validate(LoginType.schema)
    async login(req: LoginType.Req) {
        const { userName, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: userName,
                    },
                    {
                        email: userName,
                    }
                ],
                password: password
            }
        })

        if (!user) throw new NotFoundError("tài khoản hoặc mật khẩu không đúng");

        if (user.two_factor_secret) {
            const templay_token = generateTempToken(user.id.toString());
            return new LoginType.Req2FA(
                templay_token
            )
        }


        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user.id.toString());
        return new LoginType.LoginSuccess(
            accessToken,
            refreshToken
        )
    }

    @Post()
    @Validate(RegisterType.schema)
    async register(req: RegisterType.Req) {
        const { userName, password, email } = req.body;


        const exitUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: userName,
                    },
                    {
                        email: email
                    }
                ]
                
            }
        })


        if (exitUser) throw new ConflictError("Email or Username already exists")
        const user = await prisma.user.create({
            data: {
                username: userName,
                password,
                email,
                is_active: false
            }
        })

        const token = generateEmailToken(user.id.toString());
        logger.debug(`token: ${token}`)

        await sendEmailVerify(token);

        return 
    }

    @Get()
    @Validate(VerifyEmail.schema)
    async verifyEmail(req: VerifyEmail.Req){
        const token = req.query.token;
        const {userid} = verifyEmailToken(token);

        await prisma.user.update({
            where: {
                id: +userid
            },
            data: {
                is_active: true
            }
        })

        return 
    }


    @Post() 
    @IsAuth()
    @Validate(Enable2faType.schema)
    async enable2fa(req: Enable2faType.Req) {
        const userId = req.user.id;
        const data = await enable2fa(userId)
        return new Enable2faType.Enable2FASuccess(
            data.secret,
            data.otpauth_url!
        );
    }

    @Post() 
    @IsAuth()
    @Validate(Confirm2faType.schema)
    async confirm2fa(req: Confirm2faType.Req) {
        const userId = req.user.id;
        const { secret , code} = req.body;

        const isValid = verify2fa(secret, code);

        if (!isValid) throw new BadRequestError("Mã xác thực không đúng");

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                two_factor_secret: secret,
            }
        })

        return 
    }


    @Post() 
    @Validate(Verify2faType.schema)
    async verify2fa(req: Verify2faType.Req) {

        const { templay_token, code } = req.body;


        const {userid} = verifyTempToken(templay_token);

        const user = await prisma.user.findFirst({
            where: {
                id: +userid
            }
        })

        if (!user) throw new NotFoundError("Người dùng không tồn tại");
        if (!user.two_factor_secret) throw new BadRequestError("Người dùng không bật xác thực 2 yếu tố");

        const isValid = verify2fa(user.two_factor_secret, code);
        if (!isValid) throw new UnauthorizedError("Mã xác thực không đúng");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user.id.toString());

        return new LoginType.LoginSuccess(
            accessToken,
            refreshToken
        );
    }

    @Post()
    @Validate(RefreshTokenType.schema)
    async refreshToken(req: RefreshTokenType.Req) {
        const {refresh_token} = req.body;

        const decode = verifyRefreshToken(refresh_token);

        const user = await prisma.user.findFirst({
            where: {
                id: +decode.userid
            }
        })

        if (!user) throw new NotFoundError("Người dùng không tồn tại");

        const accessToken = generateAccessToken(user);

        return new RefreshTokenType.RefreshTokenSuccess(
            accessToken,
        );
    }
}
