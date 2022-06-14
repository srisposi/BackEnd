import { Test, TestingModule } from '@nestjs/testing';
import { ProductosResolver } from './productos.resolver';

describe('ProductosResolver', () => {
  let resolver: ProductosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosResolver],
    }).compile();

    resolver = module.get<ProductosResolver>(ProductosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
