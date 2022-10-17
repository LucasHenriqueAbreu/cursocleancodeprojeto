import Cpf from "../src/v3/Cpf";

describe('CpfValidator tests', () => {
  it('Deve retornar verdairo para um CPF válido mesmo sem formatação.', () => {
    expect(new Cpf('38106868087')).toBeInstanceOf(Cpf);
  });

  it('Deve retornar verdairo para um CPF válido mesmo com formatação.', () => {
    expect(new Cpf('355.446.340-09')).toBeInstanceOf(Cpf);
  });

  it('Deve causar um erro para um CPF inválido mesmo sem formatação.', () => {
    expect(() => new Cpf('83261646009')).toThrow('Cpf value is not valid');
  });

  it('Deve causar um erro para um CPF inválido mesmo com formatação.', () => {
    expect(() => new Cpf('832.616.460-09')).toThrow('Cpf value is not valid');
  });

  it('Deve causar um erro para um CPF com todos os números iguáis.', () => {
    expect(() => new Cpf('888.888.888-88')).toThrow('Cpf value is not valid');
  });
});