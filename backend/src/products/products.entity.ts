import { Entity, Column } from "typeorm";
import { OmitType, ApiProperty } from "@nestjs/swagger";

import { utils } from '../helpers/utils.helpers.service';

export default class ProductsEntity {

    @ApiProperty(utils.getApiProperty('productId'))
    @Column({ name: 'id', type: 'string' })
    id: string;

    @ApiProperty(utils.getApiProperty('status'))
    status: Boolean

    @ApiProperty(utils.getApiProperty('sku'))
    sku: Number

    @ApiProperty(utils.getApiProperty('language'))
    language: String

    @ApiProperty(utils.getApiProperty('categories'))
    categories: String

    @ApiProperty(utils.getApiProperty('title'))
    title: String

    @ApiProperty(utils.getApiProperty('description'))
    description: String

    @ApiProperty(utils.getApiProperty('images'))
    images: String

    @ApiProperty(utils.getApiProperty('tags'))
    tags: String

    @ApiProperty(utils.getApiProperty('price'))
    price: String

    @ApiProperty(utils.getApiProperty('weight'))
    weight: Number

    @ApiProperty(utils.getApiProperty('taxValue'))
    taxValue: Number

    @ApiProperty(utils.getApiProperty('ean'))
    ean: String

    @ApiProperty(utils.getApiProperty('supplierRef'))
    supplierRef: String

    @ApiProperty(utils.getApiProperty('brand'))
    brand: String

    @ApiProperty(utils.getApiProperty('size'))
    size: String

    @ApiProperty(utils.getApiProperty('sizeMixed'))
    sizeMixed: String

    @ApiProperty(utils.getApiProperty('colors'))
    colors: String

    @ApiProperty(utils.getApiProperty('dogJacketType'))
    dogJacketType: String

    @ApiProperty(utils.getApiProperty('supplier'))
    supplier: String

    @ApiProperty(utils.getApiProperty('dogJacketSize'))
    dogJacketSize: String

    @ApiProperty(utils.getApiProperty('scanCode'))
    scanCode: String

    @ApiProperty(utils.getApiProperty('purchasePrice'))
    purchasePrice: String

    @ApiProperty(utils.getApiProperty('stores'))
    stores: Object[];
}

export class QuerysEntity {

    @ApiProperty(utils.getApiProperty('skip'))
    skip: number;

    @ApiProperty(utils.getApiProperty('take'))
    take: number;

    @ApiProperty(utils.getApiProperty('search'))
    search: Number
}


export class ProductDto extends ProductsEntity { };

export class CreateProductDto extends OmitType(ProductDto, ['id']) { };
export class UpdateProductDto extends OmitType(ProductDto, ['id']) { };
export class QueryProductDto extends QuerysEntity { };

export class GetProductsDto {
    @ApiProperty({ required: true })
    count: number;

    @ApiProperty({ type: ProductDto, isArray: true })
    data: ProductDto[];
};