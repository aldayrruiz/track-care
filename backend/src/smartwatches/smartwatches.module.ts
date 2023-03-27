import { Module } from '@nestjs/common';
import { SmartwatchesController } from './smartwatches.controller';
import { SmartwatchesService } from './smartwatches.service';

@Module({
  controllers: [SmartwatchesController],
  providers: [SmartwatchesService],
})
export class SmartwatchesModule {}
