import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    submittedPassword: string,
  ): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const isPasswordMatching = await bcrypt.compare(
      submittedPassword,
      user.password,
    );
    if (!isPasswordMatching) return null;
    user.password = undefined;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
