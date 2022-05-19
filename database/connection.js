const mongoose = require('mongoose');

const { DATABASE } = process.env;

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  _('Connected to MongoDB');
});
mongoose.connection.on('error', () => {
  _('Error in connection');
});
