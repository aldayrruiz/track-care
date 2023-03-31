import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from 'src/positions/schemas/position.schema';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

const PositionMongoose = MongooseModule.forFeature([
	{ name: Position.name, schema: PositionSchema },
]);

@Module({
	imports: [PositionMongoose],
	controllers: [PositionsController],
	providers: [PositionsService],
})
export class PositionsModule {}
