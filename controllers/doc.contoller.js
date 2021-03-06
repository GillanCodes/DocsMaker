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

        const {title, method, type, content} = req.body;


    docsModel.findByIdAndUpdate(req.params.id, {
        $push: {
            section: {
                title,
                method,
                stype: type,
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

module.exports.delete = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(400).send(req.params.id + " is an invalid Id");

    docsModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) throw err
        else return res.send(data)
    });

}

module.exports.deleteSection = (req, res) => {

    if (!isValidObjectId(req.params.id)) 
        return res.status(400).send(req.params.id + " is an invalid Id");

    docsModel.findByIdAndUpdate(req.params.id, 
        {
            $pull: {section: {
                _id: req.params.sectionId
            }},
        }, {
            new: true
    }, (err, data) => {
        if (err) throw err
        else return res.send(data);
    });

}