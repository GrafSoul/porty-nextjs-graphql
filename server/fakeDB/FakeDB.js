// Seed Data
const { portfolios, users, forumCategories } = require('./data');
// Models
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const ForumCategory = require('../database/models/forumCategory');

class FakeDB {
    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
    }

    async addData() {
        await User.create(users);
        await Portfolio.create(portfolios);
        await ForumCategory.create(forumCategories);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }
}

module.exports = new FakeDB();
