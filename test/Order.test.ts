import Coupom from "../src/domain/entities/Cupom";
import Dimension from "../src/domain/entities/Dimension";
import Item from "../src/domain/entities/Item";
import Order from "../src/domain/entities/Order";
import OrderItem from "../src/domain/entities/OrderItem";

describe('Tests para endidade Order (Pedido)', () => {
  const item1 = new Item(1, 'Farinha', 10);
  const item2 = new Item(2, 'Leite', 10);
  const item3 = new Item(3, 'Ovos', 10);


  describe('Deve ser possível criar um pedido com cpf inválido', () => {
    const validCpf = [
      '38106868087',
      '355.446.340-09',
    ]

    it.each(validCpf)('Deve retornar verdairo para um CPF válido mesmo sem formatação.', (validCpf: string) => {
      const order = new Order(validCpf, new Dimension(20, 15, 10, 1));
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
      expect(() => new Order(invalidCpf, new Dimension(20, 15, 10, 1))).toThrow('Cpf value is not valid');
    });
  });

  it('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const order = new Order('355.446.340-09', new Dimension(20, 15, 10, 1));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));
    expect(order.getTotal()).toEqual(60);
  });

  it('Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)', () => {
    const order = new Order('355.446.340-09', new Dimension(20, 15, 10, 1));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));

    order.addCoupom(new Coupom('VALOR20', 20, new Date()))

    expect(order.getTotal()).toEqual(48);
  });

  it('Não deve aplicar cupom de desconto expirado', () => {
    const order = new Order('355.446.340-09', new Dimension(20, 15, 10, 1));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    order.addItem(new OrderItem(item2.id, item2.value, 2));
    order.addItem(new OrderItem(item3.id, item3.value, 2));
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const yesterday = today;
    expect(() => order.addCoupom(new Coupom('VALOR20', 20, yesterday))).toThrow(new Error('Expired coupon'));
  });

  it('Não deve ser possível informar um item mais de uma vez, ao fazer um pedido', () => {
    const order = new Order('355.446.340-09', new Dimension(20, 15, 10, 1));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    expect(() => order.addItem(new OrderItem(item1.id, item1.value, 2))).toThrow(new Error('Item already exists in the order'));
  });

  it('Deve calcular o valor do frete (R$ 10,00), caso o valor seja menor que o valor mínimo deve retornar o valor mínimo', () => {
    const order = new Order('355.446.340-09', new Dimension(20, 15, 10, 1));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    expect(order.freight).toEqual(10);
  });

  it('Deve calcular o valor do frete (R$ 30,00)', () => {
    const order = new Order('355.446.340-09', new Dimension(100, 30, 10, 3));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    expect(order.freight).toEqual(30);
  });

  it('Deve calcular o valor do frete (R$ 400,00) ', () => {
    const order = new Order('355.446.340-09', new Dimension(200, 100, 50, 40));
    order.addItem(new OrderItem(item1.id, item1.value, 2));
    expect(order.freight).toEqual(400);
  });

});