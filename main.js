const app = require('./server/express');
const chalk = require('chalk');
const PORT = process.env.PORT || 3000;
console.log('port is ', PORT);
const startServer = () =>
  new Promise(res => {
    app.listen(PORT, () => {
      console.log(
        chalk.greenBright(`Application now listening on PORT ${PORT}`)
      );
      res(true);
    });
  });

module.exports = startServer;
