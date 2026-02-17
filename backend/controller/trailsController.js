const trailsModel = require('../models/trailsModel');
const imagesModel = require('../models/imagesModel');
const commentsModel = require('../models/commentsModel');

const trailListView = async (req, res) => {
    //get trail-data
    const trails = await trailsModel.getAll();
    //return view with trail-elements loaded into
    res.render('../views/trail-list', {trails: trails});
    
}

const trailView = async (req, res) => {
    const trailId = parseInt(req.params.trailId);
    console.log("Parameter: ", trailId);
    //load trail element into template
    const trail = (await trailsModel.getById(trailId))[0];
    const images = await imagesModel.getByTrailId(trailId);
    const comments = await commentsModel.getByTrailId(trailId);

    res.render('../views/trail-view', {trail: trail, images: images, comments: comments});
    //load images into template
    //load commentes into templete 
    //return view
}


module.exports = {
    trailListView, 
    trailView
};