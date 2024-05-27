// routes/modules/user.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const md5 = require('md5');
const { SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../midware/checkToken');
router.post('/register', async (req, res) => {
    const { account, password } = req.body;

    try {
        // 检查是否已经存在该账号
        const existingUser = await UserModel.findOne({ account });
        if (existingUser) {
            // 如果账号已经存在，返回错误信息并结束函数执行
            return res.json({
                code: 400,
                msg: '账号已存在'
            });
        }

        // 创建新用户并对密码进行加密
        const newUser = await UserModel.create({ account, password: md5(password) });

        // 返回注册成功信息
        return res.json({
            code: 200,
            msg: '注册成功'
        });
    } catch (err) {
        // 捕获错误并返回失败信息
        console.error(err);
        return res.json({
            code: 400,
            msg: '注册失败'
        });
    }
});

// 登录路由
router.post('/login', (req, res) => {
    const { account, password } = req.body;

    // 通过账号和密码查找用户
    UserModel.findOne({ account, password: md5(password) }).then(user => {
        if (!user) {
            // 如果用户不存在，返回错误信息
            return res.json({
                code: 400,
                msg: '用户名或密码错误'
            });
        }
        let token = jwt.sign(
            { // 相关数据
                _id: user._id
            },
            `${SECRET}`, // 加密
            {  // 有效期
                expiresIn: 60 * 60 * 24
            })
        // 如果用户存在，返回成功信息和用户数据
        return res.json({
            code: 200,
            msg: '登录成功',
            data: user,
            token: token
        });
    }).catch(err => {
        // 捕获错误并返回失败信息
        console.error(err);
        return res.json({
            code: 400,
            msg: '登录失败'
        });
    });
});

// 路由：获取用户信息（需要身份验证）
router.get('/userinfo', verifyToken, (req, res) => {
    // 根据解析后的用户信息获取用户数据
    const userId = req.user._id;
    UserModel.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({ msg: '用户不存在' });
        }
        res.json({
            code: 200,
            msg: '获取用户信息成功',
            data: user
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ msg: '服务器内部错误' });
    });
});


module.exports = router;
