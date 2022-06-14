import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProductosInput } from './dto/create-productos.input';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';

@Resolver(of => Productos)
export class ProductosResolver {
    constructor(private productosService: ProductosService) {}

    @Query(returns => Productos)
    getProductos(@Args('id', {type: () => Int}) id: number): Promise<Productos> {
        return this.productosService.findOne(id);
    }

    @Query((returns) => [Productos])
    productos(): Promise<Productos[]>{
        return this.productosService.findAll();
    }
    @Mutation(returns => Productos)
    createProductos(@Args('createProductosInput') createProductosInput: CreateProductosInput): Promise<Productos>{
        return this.productosService.createProductos(createProductosInput);
    } 
    
 

}

