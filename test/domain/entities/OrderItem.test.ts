import OrderItem from '../../../src/domain/entities/OrderItem';


describe('Tests para entidade Order Item', () => {
  it('Deve criar uma instância de OrderItem', () => {
    const orderItem = new OrderItem(1, 10, 5.5);
    expect(orderItem).toBeInstanceOf(OrderItem);
  });

  it('Deve retornar o valor total de um OrderItem', () => {
    const orderItem = new OrderItem(1, 10, 5.5);
    expect(orderItem.total).toEqual(55);
  });

  it('Não deve ser possível cadastrar uma OrderItem com amount zerado', () => {
    expect(() => new OrderItem(1, 0, 5.5)).toThrow(new Error('Amount must have value'))
  });
});