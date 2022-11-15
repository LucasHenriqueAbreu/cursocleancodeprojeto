import Cpf from './Cpf';
import Coupom from './Cupom';
import OrderItem from './OrderItem';

class Order {
  private readonly cpf: Cpf;
  private orderItens: OrderItem[] = [];
  private cupom?: Coupom;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }

  public addItem(orderItem: OrderItem): void {
    if (this.itemAlreadyExists(orderItem)) {
      throw new Error('Item already exists in the order');
    }
    this.orderItens.push(orderItem);
  }

  public addCoupom(cupom: Coupom): void {
    if (new Date().getTime() > cupom.expirationDate.getTime()) {
      throw new Error('Expired coupon');
    }
    this.cupom = cupom;
  }

  public getTotal(): number {
    const total = this.orderItens.reduce<number>(
      (previousValue: number, currentValue: OrderItem) => previousValue + currentValue.total,
      0);
    return this.cupom ? total - this.cupom.getDiscount(total) : total;
  }

  private itemAlreadyExists(orderItem: OrderItem): boolean {
    return this.orderItens.some((orderItemAtTheTime: OrderItem) => orderItemAtTheTime.idItem === orderItem.idItem);
  }
}

export default Order;