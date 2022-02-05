import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
	],
	providers: [UsersService],
	exports: [UsersService],
	controllers: [UserController],
})
export class UsersModule {}
