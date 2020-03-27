const express = require('express');
const router = express.Router();


// Item model

const Item = require('../models/Item');

// @route   api/items
// @desc    Get all Items
// @access  Public access

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))
});

// @route   api/items
// @desc   create an item
// @access  Public access
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then((item) => {
            req.json(item);
        });
});


// @route   api/items
// @desc    delete an item
// @access  Public access
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then((item) => {
            item.remove()
                .then(() => {
                    req.json({ success : true });
                })
        })
        .catch((err) => {
            res.status(404).json({ success: false});
        })
});


module.exports = router;