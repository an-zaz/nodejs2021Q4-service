import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @IsOptional()
  userId: string | null;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsUUID()
  @IsOptional()
  boardId: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsUUID()
  columnId: string | null;
}
