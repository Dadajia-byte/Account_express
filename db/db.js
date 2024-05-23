module.exports = function (sucess, error) {
    // 判断error是否为默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('数据库连接失败');
        }
    }

    const mongoose = require('mongoose');
    const config = require('../config/config');

    // 连接数据库
    mongoose.connect(`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.once('open', () => {
        sucess();
    });

    mongoose.connection.on('error', () => {
        error();
    });

    mongoose.connection.on('close', () => {
        console.log('数据库连接已断开');
    })

}