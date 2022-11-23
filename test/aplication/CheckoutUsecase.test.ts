import CheckoutUsecase from '../../src/aplication/CheckoutUsecase';
import GetTotalOrderByCpfUsecase from '../../src/aplication/GetTotalOrderByCpfUsecase';
import Dimension from '../../src/domain/entities/Dimension';
import Item from '../../src/domain/entities/Item';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

describe('Testes para usecase de Checkout', () => {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(new Item(1, 'Farinha', 10, new Dimension(20, 15, 10, 1)));
  itemRepository.save(new Item(2, 'Leite', 10, new Dimension(20, 15, 10, 1)));
  itemRepository.save(new Item(3, 'Ovos', 10, new Dimension(20, 15, 10, 1)));

  const orderRepository = new OrderRepositoryMemory();

  const usecase = new CheckoutUsecase(itemRepository, orderRepository);
  it('Deve criar um pedido com sucesso', async () => {
    const input = {
      cpf: '430.082.250-63',
      itens: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 10 },
      ],
    };
    usecase.execute(input);
    const getOrdersByCpf = new GetTotalOrderByCpfUsecase(orderRepository);
    const orders = await getOrdersByCpf.execute('430.082.250-63');
    expect(orders).toHaveLength(1);
    expect(orders[0].total).toBe(160);
  });
});