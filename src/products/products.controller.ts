import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsService: ClientProxy,
  ) {}

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsService.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService.send(
      { cmd: 'find_product_by_id' },
      { idproduct },
    );
  }

  @Post()
  createProduct(@Body() product: any) {
    return this.productsService.send({ cmd: 'create_product' }, { product });
  }

  @Post('/enable/:id')
  enableProduct(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService.send({ cmd: 'enable_product' }, { idproduct });
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) idproduct: number,
    @Body() product: any,
  ) {
    return this.productsService.send(
      { cmd: 'update_product' },
      { idproduct, product },
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService.send({ cmd: 'remove_product' }, { idproduct });
  }
}
