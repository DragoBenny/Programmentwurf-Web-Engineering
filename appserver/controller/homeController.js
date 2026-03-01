const model = require('../models/reviewsModel.js')

const getReviews = async (req, res) => {
    const reviews = await model.getAll();
    res.send({reviews: reviews});
}

module.exports = {
    getReviews
};