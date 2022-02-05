import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findUserByEmail(email);

		if (!user) {
			return null;
		}

		const isSame = await bcrypt.compare(password, user.password);

		if (!isSame) {
			return null;
		}

		return {
			id: user.id,
			email: user.email,
		};
	}

	login(user) {
		const payload = { username: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async signup(email: string, password: string) {
		const user = await this.usersService.createUser(email, password);

		return user;
	}
}
