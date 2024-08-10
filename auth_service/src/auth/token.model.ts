import { ApiProperty } from '@nestjs/swagger';
export class RefreshToken {
  userId: number;
  id: number;
  @ApiProperty({
    example: 'a7df0298-0a6d-4886-8f6a-888bd40f4def',
    description: 'Refresh токен для обновления',
  })
  token: string;
  exp: Date;
}
