const log = require('log4js').getLogger('{user/controller}');
const nowportsError = require('../../../utils/nowportsError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    USER_ATTRIBUTES_WITH_PASSWORD, CONTACT_ATTRIBUTES_WITH_ID, CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID,
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
const sequelize = setupDatabase();

const Address = require('../addresses/model');
const Contact = require('./model');
const User = require('../user/model');
const UserController = require('../user/controller');
const { isEmpty } = require('../../../utils/utils');

module.exports = function () {
	async function getBranches() {
		return await Branch.findAll({
			attributes: BRANCH_ATTRIBUTES_WITHOUT_ID,
		});
	}

	const getContacts = async () => {
		return await Contact.findAll({
			attributes: CONTACT_ATTRIBUTES_WITH_ID,
			include: [
				{
					model: Address,
					as: 'addresses',
					attributes: CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID,
				}
			],
		});
	}

	const getContactsById = async (id) => {
		if (id) {
			const contact = await Contact.findOne({
				where: {
					id: id,
				},
				attributes: CONTACT_ATTRIBUTES_WITH_ID,
				include: [
					{
						model: Address,
						as: 'addresses',
						attributes: CONTACT_ADDRESSES_ATTRIBUTES_WITH_ID,
					}
				],
			});
			if (contact) {
				return contact;
			}
			log.warn(`Contact: contact not found.`);
			throw nowportsError(ExceptionCode.CONTACT_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		log.warn(`Contact: id required.`);
		throw nowportsError(
			ExceptionCode.CONTACT_ID_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	}

	const create = async (contact) => {
		const t = await sequelize.transaction();
		if (!isEmpty(contact) && contact.firstName && contact.lastName && contact.phone &&
			contact.userId && contact.addresses) {
			const user = await UserController().getUserById(
				contact.userId
			);
			await Contact.create({
				firstName: contact.firstName,
				lastName: contact.lastName,
				phone: contact.phone,
				userId: user.id,
				addresses: contact.addresses
			}, {
				transaction: t,
				include: [
					{
						model: Address,
						as: 'addresses',
					},
				],
			}, { transaction: t });
			await t.commit();
			return;
		}
		log.warn('Contact: data required');
		throw nowportsError(
			ExceptionCode.ALL_FIELDS_ARE_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	}

	const deleteContact = async (id) => {
		let contact = await getContactsById(id);
		contact.deletedAt = Date.now();
		await contact.save();
		log.info(`Contact: ${id} deleted correctly.`);
	}

	return {
		getContacts,
		create,
		getContactsById,
		deleteContact
	};
};
