import OrderRepository from '../domain/repository/OrderRepository';
import Usecase from './Usecase';

class GetTotalOrderByCpfUsecase implements Usecase<string, Output[]> {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute(cpf: string): Promise<Output[]> {
    const orders = await this.orderRepository.getByCpf(cpf);
    return orders.map((order) => {
      return { total: order.getTotal() }
    });
  }

}

type Output = {
  total: number;
}

export default GetTotalOrderByCpfUsecase;