/* eslint-disable */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismadbService } from "src/prismadb/prismadb.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy, 'jwt'
) {
    constructor(config: ConfigService, private prismaDb: PrismadbService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user = this.prismaDb.user.findUnique({
            where: {
                id: payload.sub
            }
        });
        delete (await user).hash;
        return user;
    }
}