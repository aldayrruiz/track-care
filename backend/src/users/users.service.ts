import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(userDto: SignUpDto): Promise<UserDocument> {
		const createdUser = new this.userModel(userDto);
		return createdUser.save();
	}

	async findAll(): Promise<UserDocument[]> {
		return this.userModel.find().exec();
	}

	async findById(id: string): Promise<UserDocument> {
		return this.userModel.findById(id).exec();
	}

	async findByEmail(email: string): Promise<UserDocument> {
		return this.userModel.findOne({ email }).exec();
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
		return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
	}

	async remove(id: string): Promise<UserDocument> {
		return this.userModel.findByIdAndRemove(id).exec();
	}
}
