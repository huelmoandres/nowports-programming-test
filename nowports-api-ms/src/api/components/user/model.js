const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const setupDatabase = require('../../../store/connection');

const Contact =  require('../contacts/model');
const sequelize = setupDatabase();

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'users'
});


User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        }).catch(err => {
            throw new Error(err);
        });
});

User.Contacts = User.hasMany(Contact, {foreignKey: 'user_id', as: 'contacts'});
Contact.User = Contact.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

module.exports = User;
