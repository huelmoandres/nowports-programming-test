require('regenerator-runtime/runtime');

const {
	USER_ATTRIBUTES_WITH_PASSWORD, USER_ATTRIBUTES_WITH_ID, CONTACT_ATTRIBUTES_WITH_ID,
	CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID
} = require('../../src/utils/attributeConstants');

describe('Probar que los atributos sean los correctos', () => {
	test('[USER_ATTRIBUTES_WITH_PASSWORD] con atributos [id, name, lastName, email, password]', () => {
		const userAttributesPass = [
			'id',
			'name',
			'lastName',
			'email',
			'password',
		];
		expect(USER_ATTRIBUTES_WITH_PASSWORD).toEqual(userAttributesPass);
	});

	test('[USER_ATTRIBUTES_WITH_ID] con atributos [id, name, lastName, email]', () => {
		const userAttributesPass = [
			'id',
			'name',
			'lastName',
			'email',
		];
		expect(USER_ATTRIBUTES_WITH_ID).toEqual(userAttributesPass);
	});

	test('[CONTACT_ATTRIBUTES_WITH_ID] con atributos [id, firstName, lastName, phone]', () => {
		const userAttributesPass = [
			'id',
			'firstName',
			'lastName',
			'phone'
		];
		expect(CONTACT_ATTRIBUTES_WITH_ID).toEqual(userAttributesPass);
	});

	test('[CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID] con atributos [id, address]', () => {
		const userAttributesPass = [
			'id',
			'address'
		];
		expect(CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID).toEqual(userAttributesPass);
	});
});
