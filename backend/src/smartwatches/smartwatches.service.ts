import { Injectable } from '@nestjs/common';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';

@Injectable()
export class SmartwatchesService {
	create(createSmartwatchDto: CreateSmartwatchDto) {
		return 'This action adds a new smartwatch';
	}

	findAll() {
		return `This action returns all smartwatches`;
	}

	findOne(id: number) {
		return `This action returns a #${id} smartwatch`;
	}

	update(id: number, updateSmartwatchDto: UpdateSmartwatchDto) {
		return `This action updates a #${id} smartwatch`;
	}

	remove(id: number) {
		return `This action removes a #${id} smartwatch`;
	}
}
