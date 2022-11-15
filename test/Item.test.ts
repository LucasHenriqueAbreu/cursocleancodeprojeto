import Dimension from '../src/domain/entities/Dimension';
import Item from '../src/domain/entities/Item';

describe('Testes para endidade Item', () => {
  it('Deve criar uma instância de Item', () => {
    const item = new Item(3, 'Ovos', 10, new Dimension(20, 15, 10, 1));
    expect(item).toBeInstanceOf(Item);
  });
});