import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Employe, EmployeeSchema } from '../employees/entities/employees.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Employe.name,
        schema: EmployeeSchema
      }
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('SECRETORPRIVATEKEY'),
          signOptions: {
            expiresIn: '24h'
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [ JWTStrategy, PassportModule, JwtModule, AuthService ]
})
export class AuthModule {}
