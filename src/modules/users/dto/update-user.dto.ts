import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsDate()
  readonly birthdate?: Date;

  @IsOptional()
  @IsString()
  readonly biography?: string;
}
