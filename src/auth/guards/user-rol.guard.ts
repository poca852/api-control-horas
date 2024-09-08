import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/rol-protected.decorator';
import { Employe } from 'src/employees/entities/employees.entity';

@Injectable()
export class UserRolGuard implements CanActivate {

   constructor(
      private readonly reflector: Reflector
   ) { }

   canActivate(
      context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {


      const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

      if (!validRoles) return true;
      if (validRoles.length === 0) return true;

      const req = context.switchToHttp().getRequest();
      const user = req.user as Employe;

      if (!user)
         throw new BadRequestException('Usuario no encontrado')

      if (validRoles.includes(user.role)) {
         return true
      }

      throw new ForbiddenException('El usuario no tiene un rol valido')
   }
}
