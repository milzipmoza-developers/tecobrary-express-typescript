const {createServer} = require('http');
const {app} = require('./app');
const {sequelize} = require('./infra/database/sequelize');

const port = process.env.PORT || 8080;


(async () => {
    await sequelize.sync();

    createServer(app)
        .listen(
            port,
            () => console.info(`App running on port ${port}`)
        )
})();