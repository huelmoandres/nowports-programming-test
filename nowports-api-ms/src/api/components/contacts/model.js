const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const sequelize = setupDatabase();

const Address = require('../addresses/model');

const Contact = sequelize.define('Contact', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at"
    }
}, {
    defaultScope: {
        where: {
            deletedAt: null,
        },
    },
    sequelize,
    tableName: 'contacts'
});

Contact.Addresses = Contact.hasMany(Address, {as: 'addresses', foreignKey: 'contact_id'});
Address.Contact = Address.belongsTo(Contact, {as: 'contact', foreignKey: 'contact_id'});

module.exports = Contact;
