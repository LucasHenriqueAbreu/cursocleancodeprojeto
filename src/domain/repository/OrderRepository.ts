import Order from '../entities/Order';

interface OrderRepository {
  getByCpf(cpf: string): Promise<Order[]>;
  save(order: Order): Promise<void>;
}

export default OrderRepository;