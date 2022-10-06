/* eslint-disable */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismadbService } from 'src/prismadb/prismadb.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {

    constructor(private prismaDbService: PrismadbService) {}

    getProducts(userId: number) {
        return this.prismaDbService.product.findMany({
            where: {
                userId: userId
            }
        })
    }

    getProductById(userId: number, productId: number){
        return this.prismaDbService.product.findFirst({
            where: {
                id: productId,
                userId: userId,
            }
        })
    }

    async createProduct(userId: number, dto: CreateProductDto) {
        const product = await this.prismaDbService.product.create({
            data: {
                userId: userId,
                ...dto
            }
        });

        return product;
    }

    async editProductById(userId: number, productId: number, dto: EditProductDto){
        const product = await this.prismaDbService.product.findUnique({
            where: {
                id: productId
            }
        });

        if(!product || product.userId !== userId) {
            throw new ForbiddenException('Product not found or access to product denied!');
        }

        return this.prismaDbService.product.update({
            where: {
                id: productId
            },
            data: {
                ...dto
            }
        })
    }

    async deleteProductById(userId: number, productId: number){
        const product = await this.prismaDbService.product.findUnique({
            where: {
                id: productId
            }
        });

        if(!product || product.userId !== userId) {
            throw new ForbiddenException('Product not found or access to product denied!');
        }

        await this.prismaDbService.product.delete({
            where: {
                id: productId
            }
        })
    }

}
