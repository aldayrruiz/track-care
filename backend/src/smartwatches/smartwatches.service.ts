import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSmartwatchDto } from './dto/create-smartwatch.dto';
import { UpdateSmartwatchDto } from './dto/update-smartwatch.dto';
import { Smartwatch, SmartwatchDocument } from './schemas/smartwatch.schema';

@Injectable()
export class SmartwatchesService {
	constructor(@InjectModel(Smartwatch.name) private smartwatchModel: Model<SmartwatchDocument>) {}

	async create(smartwatchDto: CreateSmartwatchDto): Promise<SmartwatchDocument> {
		const createdSmartwatch = new this.smartwatchModel(smartwatchDto);
		return createdSmartwatch.save();
	}

	async findAll(): Promise<SmartwatchDocument[]> {
		return this.smartwatchModel.find().exec();
	}

	async findById(id: string): Promise<SmartwatchDocument> {
		return this.smartwatchModel.findById(id).exec();
	}

	async findByMAC(MAC: string): Promise<SmartwatchDocument> {
		return this.smartwatchModel.findOne({ MAC }).exec();
	}

	async update(id: string, updateSmartwatchDto: UpdateSmartwatchDto): Promise<SmartwatchDocument> {
		return this.smartwatchModel.findByIdAndUpdate(id, updateSmartwatchDto).exec();
	}

	async remove(id: string): Promise<SmartwatchDocument> {
		return this.smartwatchModel.findByIdAndRemove(id).exec();
	}
}
