import Cupom from "../src/domain/entities/Cupom";

describe('Testes para endidade Cupom', () => {
  it('Deve criar uma instância de Cupom', () => {
    const cupom = new Cupom('CUPOM20', 20);
    expect(cupom).toBeInstanceOf(Cupom);
  });

  it('Deve retornar o desconto a partir de um valor', () => {
    const cupom = new Cupom('CUPOM20', 20);
    expect(cupom.getDiscount(100)).toEqual(20);
  });

  it('Deve retornar o desconto a partir de um valor zerado', () => {
    const cupom = new Cupom('CUPOM20', 20);
    expect(cupom.getDiscount(0)).toEqual(0);
  });
});