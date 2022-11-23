import Item from '../entities/Item';

interface ItemRepository {
  findById(id: number): Promise<Item>;
  save(item: Item): Promise<void>;
}

export default ItemRepository;