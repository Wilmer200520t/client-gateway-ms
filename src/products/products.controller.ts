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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsService: ClientProxy,
  ) {}

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsService
      .send({ cmd: 'find_all_products' }, paginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService
      .send({ cmd: 'find_product_by_id' }, idproduct)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Post()
  createProduct(@Body() product: any) {
    return this.productsService.send({ cmd: 'create_product' }, product).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('/enable/:id')
  enableProduct(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService.send({ cmd: 'enable_product' }, idproduct).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) idproduct: number,
    @Body() product: any,
  ) {
    return this.productsService
      .send({ cmd: 'update_product' }, { idproduct, product })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) idproduct: number) {
    return this.productsService.send({ cmd: 'remove_product' }, idproduct).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
