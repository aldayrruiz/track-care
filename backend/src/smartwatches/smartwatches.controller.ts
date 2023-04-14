import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { SmartwatchResponse } from './dto/smartwatch-response.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';
import { SmartwatchesService } from './smartwatches.service';

@ApiTags('smartwatches')
@Controller('smartwatches')
export class SmartwatchesController {
	constructor(private readonly smartwatchesService: SmartwatchesService) {}

	@Post()
	async create(@Body() createSmartwatchDto: CreateSmartwatchDto) {
		const smartwatch = await this.smartwatchesService.create(createSmartwatchDto);
		const response = plainToClass(SmartwatchResponse, smartwatch.toJSON());
		return response;
	}

	@Get()
	async findAll() {
		const smartwatches = await this.smartwatchesService.findAll();
		const response = smartwatches.map((smartwatch) =>
			plainToClass(SmartwatchResponse, smartwatch.toJSON())
		);
		return response;
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const smartwatch = await this.smartwatchesService.findById(id);
		const response = plainToClass(SmartwatchResponse, smartwatch.toJSON());
		return response;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateSmartwatchDto: UpdateSmartwatchDto) {
		const smartwatch = await this.smartwatchesService.update(id, updateSmartwatchDto);
		const response = plainToClass(SmartwatchResponse, smartwatch.toJSON());
		return response;
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const smartwatch = await this.smartwatchesService.remove(id);
		const response = plainToClass(SmartwatchResponse, smartwatch.toJSON());
		return response;
	}
}
