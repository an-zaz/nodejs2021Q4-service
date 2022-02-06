import { IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
