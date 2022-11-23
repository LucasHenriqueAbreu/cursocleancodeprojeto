import Dimension from "../../../src/domain/entities/Dimension";
import Item from "../../../src/domain/entities/Item";


describe('Testes para endidade Item', () => {
  it('Deve criar uma instância de Item', () => {
    const item = new Item(3, 'Ovos', 10, new Dimension(20, 15, 10, 1));
    expect(item).toBeInstanceOf(Item);
  });

  it('Deve calcular o valor do frete (R$ 10,00), caso o valor seja menor que o valor mínimo deve retornar o valor mínimo', () => {
      const item = new Item(1, 'teste', 200, new Dimension(20, 15, 10, 1));
      expect(item.freight).toEqual(10);
    });
  
    it('Deve calcular o valor do frete (R$ 30,00)', () => {
      const item = new Item(1, 'teste', 200, new Dimension(100, 30, 10, 3));
      expect(item.freight).toEqual(30);
    });
  
    it('Deve calcular o valor do frete (R$ 400,00) ', () => {
      const item = new Item(1, 'teste', 200, new Dimension(200, 100, 50, 40));
      expect(item.freight).toEqual(400);
    });
});