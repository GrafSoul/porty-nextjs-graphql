const portfolioQueries = {
    portfolio: (root, { id }, ctx) => {
        return ctx.models.Portfolio.getById(id);
    },
    portfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAll();
    },
    userPortfolios: (root, args, ctx) => {
        return ctx.models.Portfolio.getAllByUser();
    },
};

const portfolioMutations = {
    createPortfolio: async (root, { input }, ctx) => {
        const createdPortfolio = await ctx.models.Portfolio.create(input);
        return createdPortfolio;
    },
    updatePortfolio: async (root, { id, input }, ctx) => {
        const updatedPortfolio = await ctx.models.Portfolio.updateById(
            id,
            input,
        );

        return updatedPortfolio;
    },

    deletePortfolio: async (root, { id }, ctx) => {
        const deletedPortfolio = await ctx.models.Portfolio.deleteById(id);
        return deletedPortfolio._id;
    },
};

const userMutations = {
    signUp: async (root, { input }, ctx) => {
        const registeredUser = await ctx.models.User.signUp(input);
        return registeredUser._id;
    },
    signIn: (root, { input }, ctx) => {
        return ctx.models.User.signIn(input, ctx);
    },
    signOut: (root, args, ctx) => {
        return ctx.models.User.signOut(ctx);
    },
};

const userQueries = {
    user: (root, args, ctx) => {
        return ctx.models.User.getAuthUser(ctx);
    },
};

const forumQueries = {
    forumCategories: (root, args, ctx) => {
        return ctx.models.ForumCategory.getAll();
    },
    topicsByCategory: (root, { category }, ctx) => {
        return ctx.models.Topic.getAllByCategory(category);
    },
};

exports.resolvers = {
    Query: {
        ...portfolioQueries,
        ...userQueries,
        ...forumQueries,
    },
    Mutation: {
        ...portfolioMutations,
        ...userMutations,
    },
};
