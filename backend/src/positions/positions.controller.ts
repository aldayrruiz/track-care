import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
	constructor(private readonly positionsService: PositionsService) {}

	@Get()
	async findAll() {
		return this.positionsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.positionsService.findById(id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
		return this.positionsService.update(id, updatePositionDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.positionsService.remove(id);
	}
}
