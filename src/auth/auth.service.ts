import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Employe } from 'src/employees/entities/employees.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(Employe.name)
    private userModel: Model<Employe>

  ) { }

  async login(loginDto: LoginDto) {

    const { password, username } = loginDto;

    let user = await this.userModel.findOne({
      username: username.toUpperCase()
    })

    if (!user) {
      throw new UnauthorizedException("Datos Incorrectos");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException("Datos Incorrectos")
    }


    user = user.toObject();
    delete user.password;
    delete user.__v;

    return {
      user,
      token: this.getJwtToken({ id: user._id.toString() })
    }

  }

  async checkStatus(user: Employe) {
    return {
       user,
       token: this.getJwtToken({ id: `${user._id}` })
    }
 }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
