/* eslint-disable */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismadbService } from "src/prismadb/prismadb.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{

    constructor(private prismadbService: PrismadbService,
        private jwt: JwtService,
        private config: ConfigService){}

    async signup(dto: AuthDto) {
    
        const hash = await argon.hash(dto.password); //create password hash with argon

        try {
            const user = await this.prismadbService.user.create( {
                data: {
                    email: dto.email,
                    hash,
                }
            });

            return this.jwtToken(user.id, user.email);
        }catch (error) {
            if(error instanceof PrismaClientKnownRequestError) { //handle user already registered error
                if (error.code === 'P2002') {  //prisma error code for "credentials taken" (https://www.prisma.io/docs/reference/api-reference/error-reference)
                    throw new ForbiddenException('User already registered!');
                }
            }
            throw error;
        }
       
    }

    async signin(dto: AuthDto) {
        const user = await this.prismadbService.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if(!user) throw new ForbiddenException('Unknown user');

        const correctPassword = await argon.verify(user.hash, dto.password);

        if(!correctPassword) {
            throw new ForbiddenException ( 'Password does not match');
        }

        return this.jwtToken(user.id, user.email);
    }

    async jwtToken(id: number, email: string): Promise<{access_token: string}> {
        const data = {
            sub: id,
            email
        }
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(data, {
            expiresIn: '120m',
            secret: secret
            });

        return {
            access_token: token,
        };
    }

}