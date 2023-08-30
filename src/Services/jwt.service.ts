/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}



//generar token al iniciar sesion usar en el login
// const token = await this.jwtAuthService.generateToken({ sub: userId });

//verificar token en el auth guard
// const decodedToken = await this.jwtAuthService.verifyToken(token);
// if (!decodedToken) {
//   // Token inválido
// }


