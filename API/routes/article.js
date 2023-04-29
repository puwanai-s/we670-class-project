var express = require('express');
var router = express.Router();
const Article = require('./../models/article');
const Tag = require('./../models/tag');
const Creator = require('./../models/creator');

// function
const createArticle = async (title, thumbnail, body, creator) => {
    const article = new Article({
        title,
        thumbnail,
        body,
        creator
    });
    return article.save();
}

const createTag = (articleId, tag, counter = 1) => {
    if (Array.isArray(tag)) {
        tag.forEach(name => {
            return Tag.findOneAndUpdate({ name }, {
                name,
                $inc: {
                    counter
                }
            }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }).then((dt) => {
                return Article.findByIdAndUpdate(articleId, {
                    $push: { tags: dt._id }
                }, {
                    new: true,
                    useFindAndModify: true
                });
            });
        });
    } else {
        return Tag.findOneAndUpdate({ tag }, {
            tag,
            $inc: {
                counter
            }
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }).then((dt) => {
            return Article.findByIdAndUpdate(articleId, {
                $push: { tags: dt._id }
            }, {
                new: true,
                useFindAndModify: true
            });
        });
    }
}

const getCreator = async (uid) => {
    const creator = await Creator.findOne({ uid });
    return creator;
}

// router
router.get('/', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { uid } = req.currentUser;
    const creator = await getCreator(uid);
    if (creator == null) {
        res.send({
            data: [],
            totalPages: 0,
            currentPage: 1
        });
    }

    try {
        const data = await Article.find({ deleted: false, creator: creator._id }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
        const count = await Article.count({ deleted: false, creator: creator._id });
        res.send({
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/', async (req, res) => {
    const { title, thumbnail, body, tags } = req.body;
    const { uid, email } = req.currentUser;
    const creator = await Creator.findOneAndUpdate({ uid }, {
        uid,
        email
    }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    });

    createArticle(title, thumbnail, body, creator._id).then(async (doc) => {
        await createTag(doc._id, tags);
        res.status(201).end();
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { uid } = req.currentUser;
    const creator = await getCreator(uid);
    if (creator == null) {
        res.status(404).end()
    }

    const article = await Article.findOne({
        _id: id,
        deleted: false
    }).populate(['creator', 'tags']);

    if (article == null) {
        res.status(404).send({ status: '404 Page Not Found' });
    } else {
        res.send(article);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { uid } = req.currentUser;
    const creator = await getCreator(uid);
    if (creator == null) {
        res.status(404).end()
    }

    const { title, thumbnail, body, tags } = req.body;
    const artcleUpdated = await Article.findOneAndUpdate(
        {
            creator: creator._id,
            _id: id
        }, {
        $set: {
            title,
            thumbnail,
            body,
            tags: []
        }
    });

    if (tags)
        await createTag(artcleUpdated._id, tags, 0);
        
    res.send({ status: 'updated' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { uid } = req.currentUser;
    const creator = await getCreator(uid);
    if (creator == null) {
        res.status(404).end()
    }
    await Article.findOneAndDelete({ creator: creator._id, _id: id });
    res.status(204).end();
});

module.exports = router;