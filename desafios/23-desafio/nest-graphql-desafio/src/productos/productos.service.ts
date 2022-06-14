import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductosInput } from './dto/create-productos.input';
import { Productos } from './productos.entity';

@Injectable()
export class ProductosService {
    constructor(@InjectRepository(Productos) private productosRepository: Repository<Productos>) {}

    createProductos(createProductosInput: CreateProductosInput): Promise<Productos>{
        const newProductos = this.productosRepository.create(createProductosInput);

        return this.productosRepository.save(newProductos);
    }


    findAll(): Promise<Productos[]>{
       return this.productosRepository.find(); //SELECT * productos
    }

    findOne(id: number): Promise<Productos> {
        return this.productosRepository.findOneByOrFail(id)

    }
}
