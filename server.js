// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// JSON ボディを受け取る
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS（必要なら）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 静的ファイル（/public/index.html など）
app.use(express.static(path.join(__dirname, 'public')));

// 例: API（必要に応じて）
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from TomoTrip server' });
});

// SPA の場合、フロントのルートを最後にキャッチ
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバ起動
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
