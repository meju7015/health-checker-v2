import { CheckerStatus } from '../entities/checker.entity';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateCheckerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly url: string;

  @IsArray()
  readonly allowStatus: (number | string)[];

  @IsArray()
  readonly disallowStatus: (number | string)[];

  @IsString({ each: true })
  readonly chanel: string[];

  @IsBoolean()
  readonly isReset: boolean;

  readonly status?: CheckerStatus;
}
