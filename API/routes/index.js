var express = require('express');
var router = express.Router();
const Article = require('./../models/article');
const Tag = require('./../models/tag');

router.get('/', (req, res) => {
    res.send({status: true, message: 'server is running..'})
})

router.get('/feature', async (req, res) => {
    const data = await Article.find({ deleted: false }).limit(6);
    res.send(data);
});

router.get('/hot', async (req, res) => {
    const data = await Article.find({ deleted: false }).sort({ views: -1 }).limit(3);
    res.send(data);
});

router.get('/tags', async (req, res) => {
    const data = await Tag.find().sort({ counter: -1 }).limit(10);
    res.send(data);
});

router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;
    const article = await Article.findOneAndUpdate({
        _id: id,
        deleted: false
    }, {
        $inc: {
            views: 1
        }
    }).populate(['creator', 'tags']);
    if (article == null) {
        res.status(404).send({ status: '404 Page Not Found' });
    } else {
        res.send(article);
    }
});

router.get('/latest', async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    try {
        const data = await Article.find({ deleted: false }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
        const count = await Article.count({ deleted: false });
        res.send({
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/tag-latest/:tag', async (req, res) => {
    const { page = 1, limit = 12 } = req.query;
    const { tag } = req.params;
    const getTag = await Tag.findOne({ name: tag });
    if (getTag == null) {
        res.send({
            data: [],
            totalPages: 0,
            currentPage: 1
        });
    }

    try {
        const data = await Article.find({
            deleted: false,
            tags: {
                $in: [getTag._id]
            }
        }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

        const count = await Article.count({
            deleted: false,
            tags: {
                $in: [getTag._id]
            }
        });

        res.send({
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;