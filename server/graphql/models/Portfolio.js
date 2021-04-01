class Portfolio {
    constructor(model, user) {
        this.Model = model;
        this.user = user;
        this.writeRights = ['instructor', 'admin'];
    }
    getAll() {
        return this.Model.find({});
    }

    getById(id) {
        return this.Model.findById(id);
    }

    getAllByUser() {
        return this.Model.find({ user: this.user._id }).sort({
            startDate: 'desc',
        });
    }

    create(data) {
        if (!this.user || !this.writeRights.includes(this.user.role)) {
            throw new Error('Not Authorised!!!');
        }

        data.user = this.user;
        return this.Model.create(data);
    }

    updateById(id, data) {
        return this.Model.findByIdAndUpdate({ _id: id }, data, {
            new: true,
            runValidators: true,
        });
    }

    deleteById(id) {
        return this.Model.findByIdAndRemove({ _id: id });
    }
}

module.exports = Portfolio;
