import Coupom from "../src/domain/entities/Cupom";
import Item from "../src/domain/entities/Item";
import Order from "../src/domain/entities/Order";
import OrderItem from "../src/domain/entities/OrderItem";

describe('Tests para endidade Order (Pedido)', () => {
  describe('Deve ser possível criar um pedido com cpf inválido', () => {
    const validCpf = [
      '38106868087',
      '355.446.340-09',
    ]

    it.each(validCpf)('Deve retornar verdairo para um CPF válido mesmo sem formatação.', (validCpf: string) => {
      const order = new Order(validCpf);
      expect(order).toBeInstanceOf(Order);
    });
  });

  describe('Não deve ser possível criar um pedido com cpf inválido', () => {
    const invalidCpf = [
      '832.616.460-09',
      '888.888.888-88',
      '83261646009'
    ];

    it.each(invalidCpf)('Deve retornar verdairo para um CPF válido mesmo sem formatação.', (invalidCpf: string) => {
      expect(() => new Order(invalidCpf)).toThrow('Cpf value is not valid');
    });
  });

  it('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const order = new Order('355.446.340-09');
    const item1 = new Item(1, 'Farinha', 10);
    const item2 = new Item(2, 'Leite', 10);
    const item3 = new Item(3, 'Ovos', 10);

    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));
    expect(order.getTotal()).toEqual(60);
  });

  it('Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)', () => {
    const order = new Order('355.446.340-09');
    const item1 = new Item(1, 'Farinha', 10);
    const item2 = new Item(2, 'Leite', 10);
    const item3 = new Item(3, 'Ovos', 10);

    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));

    order.addCoupom(new Coupom('VALOR20', 20, new Date()))

    expect(order.getTotal()).toEqual(48);
  });

  it('Não deve aplicar cupom de desconto expirado', () => {
    const order = new Order('355.446.340-09');
    const item1 = new Item(1, 'Farinha', 10);
    const item2 = new Item(2, 'Leite', 10);
    const item3 = new Item(3, 'Ovos', 10);

    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));
    const today = new Date();
    today.setDate(today.getDate() -1);
    const yesterday = today;
    expect( () => order.addCoupom(new Coupom('VALOR20', 20, yesterday))).toThrow(new Error('Expired coupon'));
  });
  
});