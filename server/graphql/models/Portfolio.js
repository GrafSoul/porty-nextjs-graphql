class Portfolio {
    constructor(model) {
        this.Model = model;
    }
    getAll() {
        return this.Model.find({});
    }

    getById(id) {
        return this.Model.findById(id);
    }

    create(data) {
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
