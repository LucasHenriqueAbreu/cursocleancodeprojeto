// @ts-nocheck

export default class CpfValidator {
  public static execute(cpf: string): boolean {
    if (!CpfValidator._valueIsValid(cpf)) {
      return false;
    }
    const cleanCpf = CpfValidator._getCleanCpf(cpf);

    if (CpfValidator._allCharIsEquals(cpf)) {
      return false;
    }

    try {
      let d1, d2;
      let dg1, dg2, rest;
      let digito;
      let nDigResult;
      d1 = d2 = 0;
      dg1 = dg2 = rest = 0;

      for (let nCount = 1; nCount < cleanCpf.length - 1; nCount++) {
        digito = parseInt(cleanCpf.substring(nCount - 1, nCount));
        d1 = d1 + (11 - nCount) * digito;

        d2 = d2 + (12 - nCount) * digito;
      };

      rest = (d1 % 11);

      dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
      d2 += 2 * dg1;
      rest = (d2 % 11);
      if (rest < 2)
        dg2 = 0;
      else
        dg2 = 11 - rest;

      let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
      nDigResult = "" + dg1 + "" + dg2;
      return nDigVerific == nDigResult;
    } catch (e) {
      console.error("Erro !" + e);

      return false;
    }
  }


  static private _getCleanCpf(cpf: string): string {
    return cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace(" ", "");
  }

  static private _valueIsValid(cpf: string): boolean {
    return cpf !== null || cpf !== undefined || !(cpf.length >= 11 || cpf.length <= 14);
  }

  static private _allCharIsEquals(cpf: string): boolean {
    const firstChar = cpf = [0];
    return cpf.split('').every(c => c === firstChar);
  }
}
