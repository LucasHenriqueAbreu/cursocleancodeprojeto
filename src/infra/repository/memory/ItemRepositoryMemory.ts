import Item from '../../../domain/entities/Item';
import ItemRepository from '../../../domain/repository/ItemRepository';

class ItemRepositoryMemory implements ItemRepository {

  private itens: Item[] = [];

  async findById(id: number): Promise<Item> {
    const itemFound = this.itens.find(item => item.id === id);
    if (!itemFound) {
      throw new Error('Item not found');
    }
    return itemFound;
  }

  async save(item: Item): Promise<void> {
    this.itens.push(item);
  }
}

export default ItemRepositoryMemory;