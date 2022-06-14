import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig >({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), 
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ProductosModule],
  controllers: [AppController],
  providers: [AppService],
  })
export class AppModule {}
