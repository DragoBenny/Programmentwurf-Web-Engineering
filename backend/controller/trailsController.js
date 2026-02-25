const usersModel = require('../models/usersModel');
const trailsModel = require('../models/trailsModel');
const imagesModel = require('../models/imagesModel');
const commentsModel = require('../models/commentsModel');

const getTrails = async (req, res) => {
    const trails = await trailsModel.getAll();
    const images = await imagesModel.getAll();

    res.send({trails: trails, images: images});
}

const trailListView = async (req, res) => {

    const trails = await trailsModel.getAll();
    const images = await imagesModel.getAll();

    res.render('../views/trail-list', {trails: trails, images: images});
}

const trailView = async (req, res) => {
    const trailId = parseInt(req.params.trailId);

    const trail = (await trailsModel.getById(trailId))[0];
    const images = await imagesModel.getByTrailId(trailId);
    const comments = await commentsModel.getByTrailId(trailId);

    res.render('../views/trail-view', {trail: trail, images: images, comments: comments});
}

const createComment = async(req, res) => {
    const {content, trail_id }= req.body;
    const user_id = req.user.id;
 
    await commentsModel.save({content, trail_id, user_id});
}

module.exports = {
    getTrails,
    trailListView, 
    trailView,
    createComment
};