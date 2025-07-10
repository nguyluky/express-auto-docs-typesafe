import prisma from 'config/prisma.config';
import speakeasy from 'speakeasy';

export async function sendEmailVerify(token: string) {
}


export async function enable2fa(userId: number) {
    
    const secret = speakeasy.generateSecret({
        name: "TraoDoiMonHoc:" + userId,
    })



    return {
        secret: secret.base32,
        otpauth_url: secret.otpauth_url,
    };
}


export async function verify2fa(secret: string, code: string) {
    return speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token: code,
    });
}
