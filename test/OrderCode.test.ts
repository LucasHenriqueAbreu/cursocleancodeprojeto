import OrderCode from '../src/domain/entities/OderCode';

test("Deve gerar o código", function () {
	const orderCode = new OrderCode(new Date("2021-03-10T10:00:00"), 1);
	expect(orderCode.value).toBe("202100000001");
});