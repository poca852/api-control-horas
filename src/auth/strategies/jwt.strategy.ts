import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Employe } from 'src/employees/entities/employees.entity';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectModel(Employe.name)
    private userModel: Model<Employe>,

    configService: ConfigService
  ){
    super({
      secretOrKey: configService.get('SECRETORPRIVATEKEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<Employe>{
    const {id} = payload;
    
    let user = await this.userModel.findById(id)
    
    if(!user)
      throw new UnauthorizedException('Token no valido');
    
    if(!user.isActive)
      throw new UnauthorizedException('usuario no esta activo');

    user = user.toObject();
    delete user.password;
    delete user.__v;

    return user;
  }

}