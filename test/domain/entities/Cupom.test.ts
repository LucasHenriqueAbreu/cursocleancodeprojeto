import Coupom from '../../../src/domain/entities/Cupom';

describe('Testes para endidade Cupom', () => {
  it('Deve criar uma instância de Cupom', () => {
    const cupom = new Coupom('CUPOM20', 20, new Date());
    expect(cupom).toBeInstanceOf(Coupom);
  });

  it('Deve retornar o desconto a partir de um valor', () => {
    const cupom = new Coupom('CUPOM20', 20, new Date());
    expect(cupom.getDiscount(100)).toEqual(20);
  });

  it('Deve retornar o desconto a partir de um valor zerado', () => {
    const cupom = new Coupom('CUPOM20', 20, new Date());
    expect(cupom.getDiscount(0)).toEqual(0);
  });
});