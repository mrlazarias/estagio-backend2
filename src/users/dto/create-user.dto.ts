import {
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthdate: Date;

  @IsOptional()
  @IsString()
  readonly biography?: string;
}
