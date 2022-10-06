/* eslint-disable */
import { Controller, UseGuards, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateProductDto, EditProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    getProducts(@GetUser('id') userId: number) {
        return this.productService.getProducts(userId);
    }

    @Get(':id')
    getProductById(
        @GetUser('id') userId: number, 
        @Param('id', ParseIntPipe) productId: number
    ){
        return this.productService.getProductById(userId, productId);
    }

    @Post()
    createProduct(
        @GetUser('id') userId: number, 
        @Body() dto: CreateProductDto
    )  {
        return this.productService.createProduct(userId, dto);
    }

    @Patch(':id')
    editProductById(
        @GetUser('id') userId: number,   
        @Param('id', ParseIntPipe) productId: number,
        @Body() dto: EditProductDto
    ){
        return this.productService.editProductById(userId, productId, dto);
    }

    @Delete(':id')
    deleteProductById(
        @GetUser('id') userId: number, 
        @Param('id', ParseIntPipe) productId: number
    ){
        return this.productService.deleteProductById(userId, productId);
    }
}
