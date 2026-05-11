const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const homeRoutes = require('./routes/homeRoutes');
const listRoutes = require('./routes/listRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', homeRoutes);
app.use('/lists', listRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});