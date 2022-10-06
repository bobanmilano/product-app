/* eslint-disable */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EditProductDto {
    @IsString()
    @IsNotEmpty()
    name?: string
    
    @IsString()
    @IsNotEmpty()
    description?: string
    
    @IsNumber()
    @IsNotEmpty()
    price?: number

    @IsBoolean()
    @IsNotEmpty()
    inStock?: boolean
}