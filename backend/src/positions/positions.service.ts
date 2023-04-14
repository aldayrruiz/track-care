import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { SmartwatchesService } from 'src/smartwatches/smartwatches.service';
import { UsersService } from 'src/users/users.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionType } from './dto/type.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position, PositionDocument } from './schemas/position.schema';
@Injectable()
export class PositionsService {
	constructor(
		@InjectModel(Position.name) private positionModel: Model<PositionDocument>,
		private mailService: MailService,
		private userService: UsersService,
		private smartwatchService: SmartwatchesService
	) {}

	async create(positionDto: CreatePositionDto): Promise<PositionDocument> {
		const smartwatch = await this.smartwatchService.findByMAC(positionDto.MAC);
		const user = await this.userService.findBySmartwatchId(smartwatch.id);

		const createdPosition = new this.positionModel({
			...positionDto,
			smartwatch: smartwatch.id,
			user: user.id,
		});

		// Send emails
		if (positionDto.type === PositionType.TAKEOFF) {
			this.mailService.sendTakeOffSmartwatch(smartwatch, user);
		}
		if (positionDto.type === PositionType.EMERGENCY) {
			this.mailService.sendEmergencySmartwatch(smartwatch, user);
		}
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

	async lastPositions(): Promise<PositionDocument[]> {
		const lastPositions = await this.positionModel
			.aggregate([
				{
					$sort: { deviceTimestamp: -1 },
				},
				{
					$group: {
						_id: '$MAC',
						lastPosition: { $first: '$$ROOT' },
					},
				},
				{
					$replaceRoot: { newRoot: '$lastPosition' },
				},
			])
			.exec();

		return lastPositions;
	}
}
