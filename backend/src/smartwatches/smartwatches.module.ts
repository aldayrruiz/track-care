import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Smartwatch, SmartwatchSchema } from './schemas/smartwatch.schema';
import { SmartwatchesController } from './smartwatches.controller';
import { SmartwatchesService } from './smartwatches.service';

const SmartwatchMongoose = MongooseModule.forFeature([
	{ name: Smartwatch.name, schema: SmartwatchSchema },
]);

@Module({
	imports: [SmartwatchMongoose],
	controllers: [SmartwatchesController],
	providers: [SmartwatchesService],
	exports: [SmartwatchesService],
})
export class SmartwatchesModule {}
