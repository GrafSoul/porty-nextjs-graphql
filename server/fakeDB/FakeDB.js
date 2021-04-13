// Seed Data
const { portfolios, users, forumCategories, topics, posts } = require('./data');
// Models
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const ForumCategory = require('../database/models/forumCategory');
const Topic = require('../database/models/topic');
const Post = require('../database/models/post');

class FakeDB {
    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
        await Topic.deleteMany({});
        await Post.deleteMany({});
    }

    async addData() {
        await User.create(users);
        await Portfolio.create(portfolios);
        await ForumCategory.create(forumCategories);
        await Topic.create(topics);
        await Post.create(posts);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }
}

module.exports = new FakeDB();
