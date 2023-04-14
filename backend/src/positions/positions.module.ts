import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { Position, PositionSchema } from 'src/positions/schemas/position.schema';
import { SmartwatchesModule } from 'src/smartwatches/smartwatches.module';
import { UsersModule } from 'src/users/users.module';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

const PositionMongoose = MongooseModule.forFeature([
	{ name: Position.name, schema: PositionSchema },
]);

@Module({
	imports: [PositionMongoose, MailModule, UsersModule, SmartwatchesModule],
	controllers: [PositionsController],
	providers: [PositionsService],
})
export class PositionsModule {}
