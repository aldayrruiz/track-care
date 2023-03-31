import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';
import { SmartwatchesService } from './smartwatches.service';

@ApiTags('smartwatches')
@Controller('smartwatches')
export class SmartwatchesController {
	constructor(private readonly smartwatchesService: SmartwatchesService) {}

	@Post()
	create(@Body() createSmartwatchDto: CreateSmartwatchDto) {
		return this.smartwatchesService.create(createSmartwatchDto);
	}

	@Get()
	findAll() {
		return this.smartwatchesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.smartwatchesService.findById(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSmartwatchDto: UpdateSmartwatchDto) {
		return this.smartwatchesService.update(id, updateSmartwatchDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.smartwatchesService.remove(id);
	}
}
