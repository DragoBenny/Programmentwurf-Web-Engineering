const trailsModel = require('../models/trailsModel');
const imagesModel = require('../models/imagesModel');
const commentsModel = require('../models/commentsModel');

const trailListView = async (req, res) => {

    const trails = await trailsModel.getAll();

    res.render('../views/trail-list', {trails: trails});
}

const getPopularTrails = async (req, res) => {
    const trails = await trailsModel.getPopular();

    res.send({trails: trails});
}

// @function trailView
// get trail_id from request parameter 
// render trail-view with trail of that id + associated images and comments
const trailView = async (req, res) => {
    const trailId = parseInt(req.params.trailId);

    const trail = (await trailsModel.getById(trailId))[0];
    const images = await imagesModel.getByTrailId(trailId);
    const comments = await commentsModel.getByTrailId(trailId);

    res.render('../views/trail-view', {trail: trail, images: images, comments: comments});
}

// @function createComment
// create comment in table with data from request body 
// and id from logged in user
const createComment = async(req, res) => {
    const {content, trail_id }= req.body;
    const user_id = req.user.id;
 
    await commentsModel.save({content, trail_id, user_id});
}

module.exports = {
    getPopularTrails,
    trailListView, 
    trailView,
    createComment
};