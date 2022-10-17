// @ts-nocheck
interface SplitCPf {
  numbers: string,
  firstCheckerDigit: string,
  secondCheckerDigit: string,
}

export default class CpfValidator {
  public static execute(cpf: string): boolean {
    if (!CpfValidator._valueIsValid(cpf)) {
      return false;
    }
    const cleanCpf = CpfValidator._getCleanCpf(cpf);

    if (CpfValidator._allCharIsEquals(cleanCpf)) {
      return false;
    }

    const splitCpf = CpfValidator._splitCpf(cleanCpf);
    const firstCheckerDigit = CpfValidator._getCheckerDigit(splitCpf.numbers);
    const secondCheckerDigit = CpfValidator._getCheckerDigit(`${splitCpf.numbers}${splitCpf.firstCheckerDigit}`);
    return CpfValidator._compareDigits(splitCpf, firstCheckerDigit, secondCheckerDigit);
  }

  static private _getCheckerDigit(numbers: string): number {
    const multipliedNumbers = CpfValidator._multiplyDigits(numbers);
    const sumOfMultipliedNumbers = CpfValidator._getTotalSumNumbers(multipliedNumbers);
    const restOfDivision = sumOfMultipliedNumbers % 11;
    return restOfDivision < 2 ? 0 : 11 - restOfDivision;
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
    const firstChar = cpf[0];
    return cpf.split('').every(c => c === firstChar);
  }

  static private _splitCpf(cpf: string): SplitCPf {
    return {
      numbers: cpf.slice(0, cpf.length - 2),
      secondCheckerDigit: cpf.slice(cpf.length - 1),
      firstCheckerDigit: cpf.slice(cpf.length - 2, cpf.length - 1),
    }
  }

  private static _multiplyDigits(digits: string): number[] {
    const results = [];
    for (let i = 0; i < digits.length; i++) {
      const numberToMultiply = i + 2;
      const indexOfDigit = (digits.length - 1) - i;
      const digit = parseInt(digits[indexOfDigit], 10);
      results.push(digit * numberToMultiply);
    }
    return results;
  }

  private static _getTotalSumNumbers(numbers: number[]): number {
    return numbers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  private static _compareDigits(splitCpf: SplitCPf, firstCheckerDigit: number, secondCheckerDigit: number): boolean {
    return parseInt(splitCpf.firstCheckerDigit) === firstCheckerDigit && parseInt(splitCpf.secondCheckerDigit) === secondCheckerDigit;
  }

}
