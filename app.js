import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/router.js';
import errorHandler from './src/handlers/errorHandler.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use("/uploads", express.static("uploads"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((req, res, next) => {
  const error = new Error("요청한 페이지를 찾을 수 없습니다.");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중!`);
});

export default app;