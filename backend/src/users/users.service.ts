import * as bcrypt from 'bcrypt';

import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async findUserByEmail(email: string) {
		const user = await this.userModel.findOne({ email: email }).exec();

		if (!user) {
			return null;
		}
		return user as User;
	}

	async createUser(email: string, password: string) {
		const existingUser = await this.findUserByEmail(email);

		if (existingUser) {
			throw new ConflictException('User with same email aready exist');
		}

		const hashPassword = await bcrypt.hash(password, 12);
		const user = new this.userModel({
			email: email,
			password: hashPassword,
		});

		await user.save();
		return user.id as string;
	}
}
