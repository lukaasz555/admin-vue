import { getUniqueId } from '@/global/helpers/get-unique-id';

export class Product {
  id = -getUniqueId();
  title = '';
  categoryId = 0;
  isAvailable = true;
  price = 0;
  stock = 1;
}
