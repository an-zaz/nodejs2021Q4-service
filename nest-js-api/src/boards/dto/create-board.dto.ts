import { IsDefined, IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ArrayNotEmpty()
  columns: Array<IColumn>;
}
