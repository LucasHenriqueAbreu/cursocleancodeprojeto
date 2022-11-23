import Cpf from "../../../src/domain/entities/Cpf";

describe('CpfValidator tests', () => {
  describe('Testes para cpfs válidos', () => {
    const validCpf = [
      '38106868087',
      '355.446.340-09',
    ]

    it.each(validCpf)('Deve retornar verdairo para um CPF válido mesmo sem formatação.', (validCpf: string) => {
      expect(new Cpf(validCpf)).toBeInstanceOf(Cpf);
    });

    it('Deve ser um cpf válido.', () => {
      expect(new Cpf('355.446.340-09')).toBeInstanceOf(Cpf);
    });
  })

  describe('Testes para cpf inválido', () => {
    const invalidCpf = [
      '832.616.460-09',
      '888.888.888-88',
      '83261646009'
    ];
    it.each(invalidCpf)('Deve causar um erro para um CPF inválido mesmo com formatação.', () => {
      expect(() => new Cpf('832.616.460-09')).toThrow('Cpf value is not valid');
    });
  });

});