import Order from '../domain/entities/Order';
import ItemRepository from '../domain/repository/ItemRepository';
import OrderRepository from '../domain/repository/OrderRepository';
import Usecase from './Usecase';

type Input = {
  cpf: string,
  itens: { id: number, quantity: number }[],
}

class CheckoutUsecase implements Usecase<Input, void> {

  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly orderRepository: OrderRepository,
  ) { }

  public async execute(input: Input): Promise<void> {
    const order = new Order(input.cpf);
    for (const orderItem of input.itens) {
      const item = await this.itemRepository.findById(orderItem.id);
      order.addItem(item, orderItem.quantity);
    }
    await this.orderRepository.save(order);
  }

}

export default CheckoutUsecase;