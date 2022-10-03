import { validate } from "../src/cpfValidator";

describe('CpfValidator tests', () => {
  it('Deve retornar verdairo para um CPF válido mesmo sem formatação.', () => {
    expect(validate(83261636009)).toBeTruthy();
  });

  it('Deve retornar verdairo para um CPF válido mesmo com formatação.', () => {
    expect(validate('832.616.360-09')).toBeTruthy();
  });

  it('Deve retornar falso para um CPF inválido mesmo sem formatação.', () => {
    expect(validate(83261636009)).toBeFalsy();
  });

  it('Deve retornar falso para um CPF inválido mesmo com formatação.', () => {
    expect(validate('832.616.460-09')).toBeFalsy();
  });
});