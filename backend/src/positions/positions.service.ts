import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position, PositionDocument } from './schemas/position.schema';
@Injectable()
export class PositionsService {
	constructor(@InjectModel(Position.name) private positionModel: Model<PositionDocument>) {}

	async create(positionDto: CreatePositionDto): Promise<PositionDocument> {
		const createdPosition = new this.positionModel(positionDto);
		return createdPosition.save();
	}

	async findAll(): Promise<PositionDocument[]> {
		return this.positionModel.find().exec();
	}

	async findById(id: string): Promise<PositionDocument> {
		return this.positionModel.findById(id).exec();
	}

	async update(id: string, updatePositionDto: UpdatePositionDto): Promise<PositionDocument> {
		return this.positionModel.findByIdAndUpdate(id, updatePositionDto).exec();
	}

	async remove(id: string): Promise<PositionDocument> {
		return this.positionModel.findByIdAndRemove(id).exec();
	}
}
