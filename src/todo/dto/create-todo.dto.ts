import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class CreateTodoDto {
  @IsString()
  title: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsBoolean()
  isComplete: boolean;
}
