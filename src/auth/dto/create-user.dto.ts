import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
  
    @IsString()
    @MinLength(1)
    name: string;
  
    @IsString()
    @MinLength(1)
    lastname: string;
  
    @IsString()
    @MinLength(1)
    docnum: string;
  
    @IsString()
    @MinLength(1)
    phone: string;
  
    @IsString()
    bloodtype: string;
  
    @IsBoolean()
    @IsOptional()
    donor?: boolean = false;
  
    @IsBoolean()
    @IsOptional()
    recipient?: boolean = false;
  
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    rol?: string[];
  }

