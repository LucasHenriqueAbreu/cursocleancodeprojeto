import Dimension from '../src/domain/entities/Dimension';

describe('Testes para endidade Dimension', () => {
  describe('Testes de criação', () => {
    it('Deve criar uma instância de Dimension', () => {
      const dimension = new Dimension(10, 15, 10, 2);
      expect(dimension).toBeInstanceOf(Dimension);
    });
  
    it('Não deve ser possível criar uma Dimension altura negativa', () => {
      expect(() => new Dimension(-10, 15, 10, 2)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension largura negativa', () => {
      expect(() => new Dimension(10, -15, 10, 2)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension profundidade negativa', () => {
      expect(() => new Dimension(10, 15, -10, 2)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension peso negativo', () => {
      expect(() => new Dimension(10, 15, 10, -2)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension peso igual a zero', () => {
      expect(() => new Dimension(10, 15, 10, 0)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension todos os valores negativos', () => {
      expect(() => new Dimension(-10, -15, -10, -2)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Não deve ser possível criar uma Dimension todos os valores igual a zero', () => {
      expect(() => new Dimension(0, 0, 0, 0)).toThrow(new Error('Invalid dimension'));
    });
  
    it('Deve calcular o volume e retornar em metros', () => {
      const dimension = new Dimension(20, 15, 10, 2);
      expect(dimension.volume).toEqual(0.003);
    });
  });

  describe('Testes para cálculos das dimensões', () => {
    const dataTest = [
      { dimension: new Dimension(20, 15, 10, 1), volume: 0.003, density: 333},
      { dimension: new Dimension(100, 30, 10, 3), volume: 0.03, density: 100},
      { dimension: new Dimension(200, 100, 50, 40), volume: 1, density: 40}
    ]

    it.each(dataTest)('Deve calcular o volume corretamente e retornar em metros cubicos.', (item) => {
      expect(item.dimension.volume).toEqual(item.volume);
    });

    it.each(dataTest)('Deve calcular a dencidade corretamente e retornar em kg/m3.', (item) => {
      expect(item.dimension.density).toEqual(item.density);
    });
  });

});