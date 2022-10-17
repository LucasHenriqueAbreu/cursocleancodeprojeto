import Cpf from "../src/v2/CpfValidator";

describe('CpfValidator tests', () => {
  it('Deve retornar verdairo para um CPF válido mesmo sem formatação.', () => {
    expect(Cpf.execute('38106868087')).toBeTruthy();
  });

  it('Deve retornar verdairo para um CPF válido mesmo com formatação.', () => {
    expect(Cpf.execute('355.446.340-09')).toBeTruthy();
  });

  it('Deve retornar falso para um CPF inválido mesmo sem formatação.', () => {
    expect(Cpf.execute('83261646009')).toBeFalsy();
  });

  it('Deve retornar falso para um CPF inválido mesmo com formatação.', () => {
    expect(Cpf.execute('832.616.460-09')).toBeFalsy();
  });

  it('Deve retornar falso para um CPF com todos os números iguáis.', () => {
    expect(Cpf.execute('888.888.888-88')).toBeFalsy();
  });
});