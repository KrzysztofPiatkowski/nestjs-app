import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
