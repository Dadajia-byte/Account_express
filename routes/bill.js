const express = require('express');
const verifyToken = require('../midware/checkToken');
const BillModel = require('../models/AccountModel');

const router = express.Router();

router.get('/getList', verifyToken, (req, res) => {
    const userId = req.user._id;
    BillModel.find({ userId }).then(data => {
        res.json({
            code: 200,
            msg: '查询账单成果',
            data
        })
    })
})

router.post('/addList', verifyToken, (req, res) => {
    const userId = req.user._id;
    const { type, money, date, useFor } = req.body;
    // 确保所有必需字段都被填写
    if (!type || !date || !useFor) {
        return res.status(400).json({
            code: 400,
            msg: '缺少必需的账单信息'
        });
    }

    BillModel.create({ userId, type, money, date, useFor }).then(data => {
        res.json({
            code: 200,
            msg: '新增成功',
            data
        })
    })
})

module.exports = router;