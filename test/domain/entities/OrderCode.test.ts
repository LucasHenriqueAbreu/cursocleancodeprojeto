import OrderCode from '../../../src/domain/entities/OderCode';

describe('Testes para entidade OrderCode', () => {
	it('Deve gerar o código', () => {
		const orderCode = new OrderCode(new Date("2021-03-10T10:00:00"), 1);
		expect(orderCode.value).toBe("202100000001");
		expect(orderCode).toBeInstanceOf(OrderCode);
	})
});