const log = require('log4js').getLogger('{user/controller}');
const nowportsError = require('../../../utils/nowportsError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    USER_ATTRIBUTES_WITH_PASSWORD, USER_ATTRIBUTES_WITH_ID,
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
setupDatabase();

const User = require('./model');
const { isEmpty } = require('../../../utils/utils');

module.exports = function () {
	const getUserByEmail = async (email) => {
		if (email) {
			const user = await User.findOne({
				where: {
					email: email
				},
				attributes: USER_ATTRIBUTES_WITH_PASSWORD,
			});
			if (user) {
				return user;
			}
			log.warn('User: user not found');
			throw nowportsError(ExceptionCode.USER_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		log.error('User: email is required');
		throw nowportsError(
			ExceptionCode.USER_EMAIL_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	}

	const getUserById = async (id) => {
		if (id) {
			const user = await User.findOne({
				where: {
					id: id
				},
				attributes: USER_ATTRIBUTES_WITH_ID,
			});
			if (user) {
				return user;
			}
			log.warn('User: user not found');
			throw nowportsError(ExceptionCode.USER_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		log.error('User: id is required');
		throw nowportsError(
			ExceptionCode.USER_ID_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	}

	const create = async (user) => {
		if (!isEmpty(user) && user.name && user.lastName && user.email && user.password) {
			const exists = await User.findOne({
				where: {
					email: user.email
				},
				attributes: USER_ATTRIBUTES_WITH_PASSWORD,
			});
			if (!exists) {
				await User.create({
					name: user.name,
					lastName: user.lastName,
					email: user.email,
					password: user.password
				});
				return;
			}
			log.warn('User: user already exists');
			throw nowportsError(
				ExceptionCode.USER_ALREADY_EXISTS,
				HTTPCodes.CONFLICT
			);
		}

		log.warn('User: data required');
		throw nowportsError(
			ExceptionCode.ALL_FIELDS_ARE_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	}

	return {
		create,
		getUserByEmail,
		getUserById,
	};
};
