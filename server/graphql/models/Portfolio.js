class Portfolio {
    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }
    getAll() {
        return this.Model.find({});
    }

    getById(id) {
        return this.Model.findById(id);
    }

    create(data) {
        if (!this.user) {
            throw new Error('Not Authorised!!!');
        }

        data.user = this.user;
        return this.Model.create(data);
    }

    updateById(id, data) {
        return this.Model.findByIdAndUpdate({ _id: id }, data, { new: true });
    }

    deleteById(id) {
        return this.Model.findByIdAndRemove({ _id: id });
    }
}

module.exports = Portfolio;
