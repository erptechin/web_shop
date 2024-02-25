import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as xlsx from 'xlsx';

import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ProductsService {

  private prisma

  constructor(private readonly utilsService: UtilsService) {
    this.prisma = this.utilsService.getPrismaClient();
  }

  isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }


  async findAll(skip: number, take: number, sku: string) {
    try {
      let where: any = {}
      if (sku) {
        if (this.isNumber(+sku)) {
          where['sku'] = +sku
        } else {
          throw new NotFoundException(`Record Not Found`);
        }
      }
      const count = await this.prisma.product.count({
        where
      })
      const data = await this.prisma.product.findMany({
        skip,
        take,
        where
      });
      if (!data) throw new NotFoundException(`Record Not Found`);
      return { count, data }
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const single = await this.prisma.product.findUnique({ where: { id } });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const single = await this.prisma.product.update({
        where: { id },
        data: updateProductDto

      });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const single = await this.prisma.product.delete({
        where: { id }
      });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async importData(file: any) {
    try {
      if (!file) throw new NotFoundException(`No file provided`);

      // Parse the Excel file
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // You can now process the 'data' as needed
      for (let item of data) {
        const ifExist = await this.prisma.product.findUnique({ where: { sku: item.sku } });
        if (ifExist) {
          await this.prisma.product.update({ where: { sku: item.sku }, data: item });
        } else {
          await this.prisma.product.create({ data: item });
        }
      }
      return 'Data processed successfully';
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async importImages(file: any) {
    try {
      if (!file) throw new NotFoundException(`No file provided`);

      // Parse the Excel file
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // You can now process the 'data' as needed
      for (let item of data) {
        const ifExist = await this.prisma.product.findUnique({ where: { sku: item.sku } });
        if (ifExist) {
          await this.prisma.product.update({ where: { sku: item.sku }, data: { images: item['Main image'] } });
        }
      }
      return 'Images processed successfully';
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }
}