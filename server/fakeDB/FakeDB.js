// Seed Data
const { portfolios } = require('./data');
// Models
const Portfolio = require('../database/models/portfolio');

class FakeDB {
    async cleanData() {
        await Portfolio.deleteMany({});
    }

    async addData() {
        await Portfolio.create(portfolios);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }
}

module.exports = new FakeDB();
