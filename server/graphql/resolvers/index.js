const Portfolio = require('../../database/models/portfolio');

exports.portfolioQueries = {
    portfolio: (root, { id }) => {
        return Portfolio.findById(id);
    },
    portfolios: () => {
        return Portfolio.find({});
    },
};

exports.portfolioMutations = {
    createPortfolio: (root, { input }) => {
        const _id = require('crypto').randomBytes(10).toString('hex');
        const newPortfolio = { ...input };
        newPortfolio._id = _id;
        data.portfolios.push(newPortfolio);
        return newPortfolio;
    },
    updatePortfolio: (root, { id, input }) => {
        const index = data.portfolios.findIndex((item) => item._id === id);
        const oldPortfolio = data.portfolios[index];
        const newPortfolio = { ...oldPortfolio, ...input };
        data.portfolios[index] = newPortfolio;
        return newPortfolio;
    },

    deletePortfolio: (root, { id }) => {
        const index = data.portfolios.findIndex((item) => item._id === id);
        data.portfolios.splice(index, 1);
        return id;
    },
};
