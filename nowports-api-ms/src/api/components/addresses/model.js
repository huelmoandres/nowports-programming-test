const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const sequelize = setupDatabase();

const Address = sequelize.define('Contact', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactId: {
        type: DataTypes.INTEGER,
        field: "contact_id"
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
    tableName: 'addresses'
});

module.exports = Address;
