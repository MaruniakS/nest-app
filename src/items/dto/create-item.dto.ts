import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly subitems: string[];
}
