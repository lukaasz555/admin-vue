import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { Product } from '../models/product';
import { plainToInstance } from 'class-transformer';
import { AxiosClient } from '@/global/utils/axios-client';
import { PaginationResult } from '@/global/interfaces/pagination-result';
import { PaginationData } from '@/global/models/pagination-data';

class ProductsService implements IHttpService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getProducts(
    paginationData: PaginationData,
  ): Promise<Product[]> {
    const result =
      await this.httpClient.getData<PaginationResult<Product>>(
        'products',
      );
    paginationData
      .setTotalPages(result.meta.totalPages)
      .setTotalRecords(result.meta.totalRecords);
    return plainToInstance(Product, result.items);
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.httpClient.getData<Product>(
      `products/${productId}`,
    );
    return plainToInstance(Product, product);
  }
}

export const productsService = new ProductsService(new AxiosClient());
