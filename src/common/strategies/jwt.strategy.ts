import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret_key', 
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<JwtPayloadDto> {
    return { id: payload.id, name: payload.display, role: payload.role, hosId: payload.hosId, wardId: payload.wardId };
  }
}