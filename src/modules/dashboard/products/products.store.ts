import { defineStore } from 'pinia';
import { Product } from './models/product';

interface ProductsStoreState {
  products: Product[];
}

const baseState = (): ProductsStoreState => ({
  products: [],
});

export const useProductsStore = defineStore('productsStore', {
  state: baseState,
  actions: {
    setProducts(products: Product[]): void {
      this.products = products;
    },
    getProduct(id: number) {
      return this.products.find((product) => product.id === id);
    },
  },
});
