import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGroupChatDto {
  @IsString()
  title!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  memberUserIds!: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
