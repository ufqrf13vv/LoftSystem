const Sequelize = require('sequelize');
const sequelize = require('./connect');

const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    surName: {
        type: Sequelize.STRING
    },
    middleName: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.JSON,
        allowNull: false
    },
    access_token: {
        type: Sequelize.STRING
    }
});

//(function () {
//    User.sync({force: true});
//})();

User.associate = models => {
    User.hasMany(models.news);
};

exports.saveUser = data => {
    User.create({
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            surName: data.surName,
            middleName: data.middleName,
            img: data.img,
            permission: {
                chat: {
                    C: true,
                    R: true,
                    U: true,
                    D: true
                },
                news: {
                    C: true,
                    R: true,
                    U: true,
                    D: true
                },
                setting: {
                    C: true,
                    R: true,
                    U: true,
                    D: true
                }
            },
            access_token: ''
        })
        .then(result => {
            console.log(result);
        });
};

exports.loginUser = data => {
    User.findOne({
            where: {
                userName: data.username,
                password: data.password
            }
        })
        .then(result => {
            console.log(result);
        });
};

exports.findUser = data => {
    User.findOne({
            order: [
                ['userName']
            ],
            where: {
                userName: data.username
            }
        })
        .then(result => {
            console.log(result.count);
        });
};

//exports.findUsers = async () => {
//    let result = await User.findAll();
//    return result;
//};

exports.findUsers = () => {
    //let result = await User.findAll();
    //console.log(result)
    return User.findAll();
};

module.export = User;
