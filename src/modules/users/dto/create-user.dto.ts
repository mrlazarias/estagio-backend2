import { IsString, IsEmaiil, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsDate()
  readonly birthdate: Date;

  @IsOptional()
  @IsString()
  readonly biography?: string;
}
