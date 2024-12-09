import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { Product } from '../models/product';
import { plainToInstance } from 'class-transformer';
import { AxiosClient } from '@/global/utils/axios-client';

class ProductsService implements IHttpService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getProducts(): Promise<Product[]> {
    const products =
      await this.httpClient.getData<Product[]>('products');
    return plainToInstance(Product, products);
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.httpClient.getData<Product>(
      `products/${productId}`,
    );
    return plainToInstance(Product, product);
  }
}

export const productsService = new ProductsService(new AxiosClient());
