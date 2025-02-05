import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        configService: ConfigService ,
        
    ){
        super ({
        secretOrKey: configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload): Promise<User>{

        const {id}=payload;
        //validar payload

        if (!id) {
            throw new UnauthorizedException('Invalid token payload');
        }

        const user= await this.userRepository.findOneBy({id});
        if(!user)
            throw new UnauthorizedException('token not valid')

        if(!user.isActive)
            throw new UnauthorizedException('User is not active, talk to admins')

        return user;
    }

}