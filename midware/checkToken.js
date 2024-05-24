const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');
// 声明token中间件
module.exports = (req, res, next) => {
    // 获取token
    const token = req.headers.authorization;
    // 获取信息
    if (!token) {
        return res.json({
            code: '400',
            msg: '请登录',
            data: null
        })
    }
    // 注意这个函数似乎不支持promise的链式调用
    jwt.verify(token, `${SECRET}`, (err, data) => {

        if (err) {
            return res.json({
                code: '400',
                msg: '登录过期',
                data: null
            })
        }
        req.user = data
        next()
    })
}
