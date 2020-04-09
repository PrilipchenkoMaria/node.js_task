const app = require('express')();
const fileUpload = require('express-fileupload');
require('express-async-errors');
const db = require('./services/db');

app.use(fileUpload());
app.set('db', db);
app.use((req, res, next) => db.connect().then(next));
app.use(require('./router'));

app.use((err, req, res, next) => {
  if (err.message === 'No files were uploaded.') {
    res.status(400);
    res.json({ error: err.message });
  }
  if (err.message) {
    res.status(500).json({
      message: `${err}`,
    });
  }
  next(err);
});

app.run = () => app.listen(3000);

module.exports = app;
