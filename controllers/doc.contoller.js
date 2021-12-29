const { isValidObjectId } = require('mongoose');
let docsModel = require('../models/Documentation');


module.exports.getDocs = async (req, res) => {

    const docs = await docsModel.find();
    res.status(200).send(docs)

}

module.exports.getDoc = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(400).send(req.params.id + " is an invalid Id");

    docsModel.findById(req.params.id, (err, docs) => {
        if (err) throw err
        else res.status(200).send(docs)
    })
}

module.exports.createDocs = async (req, res) => {

    const {name, desc} = req.body;

    const newDoc = new docsModel({
        name,
        desc
    });

    try{
        const doc = await newDoc.save()
        return res.status(201).send(doc);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

}

module.exports.createSection = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(400).send(req.params.id + " is an invalid Id");

        const {title, method, content} = req.body;


    docsModel.findByIdAndUpdate(req.params.id, {
        $push: {
            section: {
                title,
                method,
                content
            }
        }
    }, {
        new: true
    }, (err, data) => {
        if (err) throw err
        else res.status(201).send(data);
    });


}