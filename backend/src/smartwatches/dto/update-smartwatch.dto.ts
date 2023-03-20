import { PartialType } from '@nestjs/swagger';
import { CreateSmartwatchDto } from './create-smartwatch.dto';

export class UpdateSmartwatchDto extends PartialType(CreateSmartwatchDto) {}
