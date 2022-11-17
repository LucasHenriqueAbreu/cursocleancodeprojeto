export default class OrderCode {
  private _value: string;

  constructor(readonly date: Date, readonly sequence: number) {
    this._value = this.generate(date, sequence);
  }

  private generate(date: Date, sequence: number) {
    const year = date.getFullYear();
    return `${year}${new String(sequence).padStart(8, "0")}`;
  }

  get value(): string {
    return this._value;
  }
}