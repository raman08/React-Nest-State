import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb+srv://admin:admin1234@mern-auth-ititech.gusxu.mongodb.net/nest_auth?retryWrites=true&w=majority',
		),
		AuthModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtStrategy],
})
export class AppModule {}
