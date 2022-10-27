import Cpf from "./Cpf";
import Cupom from "./Cupom";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  private readonly cpf: Cpf;
  private orderItens: OrderItem[] = [];
  private cupom?: Cupom;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }

  public addItem(item: OrderItem): void {
    this.orderItens.push(item);
  }

  public addCupom(cupom: Cupom): void {
    this.cupom = cupom;
  }

  public getTotal(): number {
    const total = this.orderItens.reduce<number>(
      (previousValue: number, currentValue: OrderItem) => previousValue + currentValue.total, 
    0);
    return this.cupom ? total - this.cupom.getDiscount(total) : total;
  }

}