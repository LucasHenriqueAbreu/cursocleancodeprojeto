import Order from "../../../domain/entities/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

 class OrderRepositoryMemory implements OrderRepository {
	orders: Order[];

	constructor () {
		this.orders = [];
	}
	async getByCpf(cpf: string): Promise<Order[]> {
		return this.orders.filter(order => order.cpf === cpf);
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}

}

export default OrderRepositoryMemory;