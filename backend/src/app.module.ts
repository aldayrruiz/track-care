import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseConfigService } from './db/mongoose.service';
import { PositionsModule } from './positions/positions.module';
import { SmartwatchesModule } from './smartwatches/smartwatches.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    AuthModule,
    UsersModule,
    SmartwatchesModule,
    PositionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
