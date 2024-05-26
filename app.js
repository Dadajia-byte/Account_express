const express = require('express');

const cors = require('cors');
const userRouter = require('./routes/user');
const billRouter = require('./routes/bill');
const app = express();

// 处理跨域
app.use(cors());

// 使用内置的 JSON 和 URL 编码解析中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* const Router = require('./routes/index');
app.use('/api', Router);
 */
const connectDB = require('./db/db'); // 根据实际路径调整
app.use('/user', userRouter)
app.use('/bill', billRouter)
// 配置数据库连接成功和失败的回调函数
connectDB(
    () => {
        console.log('数据库连接成功');
    },
    () => {
        console.log('数据库连接失败');
    }
);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`服务器正在端口 ${PORT}上运行`);
});