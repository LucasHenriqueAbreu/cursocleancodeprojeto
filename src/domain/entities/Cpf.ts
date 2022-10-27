// @ts-nocheck
interface SplitCPf {
  numbers: string,
  firstCheckerDigit: string,
  secondCheckerDigit: string,
}

export default class Cpf {
  private _value: string;
  private _cleanCpf?: string;
  private _splitCpf?: SplitCPf;
  private readonly ELEVEN: number = 11;
  private readonly FOURTEEN: number = 14;
  private readonly TWO: number = 2;

  constructor(value: string) {
    this._value = value;
    if (!this._isValid()) {
      throw new Error('Cpf value is not valid');
    }
  }

  private get _getCleanCpf(): string {
    if (!this._cleanCpf) {
      this._cleanCpf = this._value
        .replace(/\D/g, '');
    }
    return this._cleanCpf;
  }

  private get _getSplitCpf(): SplitCPf {
    if (!this._splitCpf) {
      this._splitCpf = {
        numbers: this._getCleanCpf.slice(0, this._getCleanCpf.length - 2),
        secondCheckerDigit: this._getCleanCpf.slice(this._getCleanCpf.length - 1),
        firstCheckerDigit: this._getCleanCpf.slice(this._getCleanCpf.length - 2, this._getCleanCpf.length - 1),
      }
    }
    return this._splitCpf;
  }

  private _isValid(): boolean {
    if (!this._valueIsValid() || this._allCharIsEquals()) {
      return false;
    }
    const firstCheckerDigit = this._getCheckerDigit(this._getSplitCpf.numbers);
    const secondCheckerDigit = this._getCheckerDigit(`${this._getSplitCpf.numbers}${this._getSplitCpf.firstCheckerDigit}`);
    return this._compareDigits(this._getSplitCpf, firstCheckerDigit, secondCheckerDigit);
  }

  private _getCheckerDigit(numbers: string): number {
    const multipliedNumbers = this._multiplyDigits(numbers);
    const sumOfMultipliedNumbers = this._getTotalSumNumbers(multipliedNumbers);
    const restOfDivision = sumOfMultipliedNumbers % this.ELEVEN;
    return restOfDivision < this.TWO ? 0 : this.ELEVEN - restOfDivision;
  }

  private _valueIsValid(): boolean {
    return this._value !== null || this._value !== undefined || !(this._value.length >= this.ELEVEN || this._value.length <= this.FOURTEEN);
  }

  private _allCharIsEquals(): boolean {
    const firstChar = this._getCleanCpf[0];
    return this._getCleanCpf.split('').every(c => c === firstChar);
  }

  private _multiplyDigits(digits: string): number[] {
    const results = [];
    for (let i = 0; i < digits.length; i++) {
      const numberToMultiply = i + this.TWO;
      const indexOfDigit = (digits.length - 1) - i;
      const digit = parseInt(digits[indexOfDigit], 10);
      results.push(digit * numberToMultiply);
    }
    return results;
  }

  private _getTotalSumNumbers(numbers: number[]): number {
    return numbers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
  }

  private _compareDigits(splitCpf: SplitCPf, firstCheckerDigit: number, secondCheckerDigit: number): boolean {
    return parseInt(splitCpf.firstCheckerDigit) === firstCheckerDigit && parseInt(splitCpf.secondCheckerDigit) === secondCheckerDigit;
  }

}
