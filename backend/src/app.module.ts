import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PositionsModule } from './positions/positions.module';
import { SmartwatchesModule } from './smartwatches/smartwatches.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [AuthModule, UsersModule, SmartwatchesModule, PositionsModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
