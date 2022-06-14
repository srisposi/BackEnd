import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productos])],
  providers: [ProductosService, ProductosResolver]
})
export class ProductosModule {}
