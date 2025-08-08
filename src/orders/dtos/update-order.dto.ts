import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
