import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SkipAuth } from 'src/auth/constants';
import { PositionResponse } from './dto/position-response.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionsService } from './positions.service';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
	constructor(private readonly positionsService: PositionsService) {}

	@SkipAuth()
	@Post()
	async create(@Body() createPositionDto: any) {
		const position = await this.positionsService.create(createPositionDto);
		const response = plainToClass(PositionResponse, position.toJSON());
		return response;
	}

	@SkipAuth()
	@Get('lastPositions')
	async lastPositions() {
		const positions = await this.positionsService.lastPositions();
		const response = positions.map((position) => plainToClass(PositionResponse, position));
		return response;
	}

	@SkipAuth()
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const position = await this.positionsService.findById(id);
		const response = plainToClass(PositionResponse, position.toJSON());
		return response;
	}

	@SkipAuth()
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
		const position = await this.positionsService.update(id, updatePositionDto);
		const response = plainToClass(PositionResponse, position.toJSON());
		return response;
	}

	@SkipAuth()
	@Delete(':id')
	async remove(@Param('id') id: string) {
		const position = await this.positionsService.remove(id);
		const response = plainToClass(PositionResponse, position.toJSON());
		return response;
	}
}
