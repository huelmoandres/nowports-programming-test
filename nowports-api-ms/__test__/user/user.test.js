require('regenerator-runtime/runtime');

const setupDatabase = require('../../src/store/connection');
setupDatabase();

const UserController = require('../../src/api/components/user/controller');
const userLazy = require('./mocks/user-includes.json');
const createUser = require('./mocks/new-user.json');

const User = require('../../src/api/components/user/model');

describe('Probar controlador del usuario [getUserByEmail]', () => {
	test('[getUserByEmail] Debe de devolver el usuario', async () => {
		const petition = (User.findOne = jest.fn(() => {
			return userLazy;
		}));
		const user = await UserController().getUserByEmail('foo@bar.com');
		expect(petition).toBeCalledTimes(1);
		expect(user).toEqual(userLazy);
	});

	test('[getUserByEmail] Debe tirar error USER_EMAIL_REQUIRED', async () => {
		const user = UserController().getUserByEmail();
		await expect(user).rejects.toEqual(Error('USER_EMAIL_REQUIRED'));
	});
});

describe('Probar controlador del usuario [getUserById]', () => {
	test('[getUserById] Debe de devolver el usuario', async () => {
		const petition = (User.findOne = jest.fn(() => {
			return userLazy;
		}));
		const user = await UserController().getUserById(1);
		expect(petition).toBeCalledTimes(1);
		expect(user).toEqual(userLazy);
	});

	test('[getUserById] Debe tirar error USER_ID_REQUIRED', async () => {
		const user = UserController().getUserById();
		await expect(user).rejects.toEqual(Error('USER_ID_REQUIRED'));
	});
});

describe('Probar controlador del usuario [create]', () => {
	test('[create] Debe de devolver un empty body', async () => {
		const newUser = createUser;
		User.findOne = jest.fn(() => {
			return null;
		});
		const petition = (User.create = jest.fn(() => {
			return null;
		}));
		const user = await UserController().create(newUser);
		expect(petition).toBeCalledTimes(1);
		expect(user).toBe();
	});

	test('[create] Debe de devolver ALL_FIELDS_ARE_REQUIRED', async () => {
		const create = UserController().create({});
		await expect(create).rejects.toEqual(Error('ALL_FIELDS_ARE_REQUIRED'));
	});

	test('[create] Debe de devolver USER_ALREADY_EXISTS', async () => {
		User.findOne = jest.fn(() => userLazy);
		const petition = (User.create = jest.fn(() => {
			return null;
		}));
		const user = UserController().create(createUser);
		expect(petition).toBeCalledTimes(0);
		await expect(user).rejects.toEqual(Error('USER_ALREADY_EXISTS'));
	});
});