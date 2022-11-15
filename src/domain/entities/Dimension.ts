class Dimension {
  constructor(
    readonly height: number,
    readonly width: number,
    readonly depth: number,
    readonly weight: number,
  ) {
    if (this.height <= 0 || this.width <= 0 || this.depth <= 0 || this.weight <= 0) {
      throw new Error('Invalid dimension');
    }
  }
  
  get volume(): number {
    return (this.height * this.width * this.depth) / 1000000;
  }

  get density(): number {
    return Math.trunc(this.weight / this.volume);
  }
}

export default Dimension;