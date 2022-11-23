interface Usecase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export default Usecase;