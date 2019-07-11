const express = require('express');
const router = express.Router();
const config = require('config');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/url');

router.post('/makeitshort', async (req, res) => {

    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(longUrl)) {
        return res.status(422).json('Invalid Url.');
    }

    try {

        let url = await Url.findOne({
            longUrl
        });

        if (url) {
            return res.json(url);
        }

        const urlCode = shortid.generate();
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
            urlCode,
            longUrl,
            shortUrl,
            createdAt: new Date()
        })

        await url.save();
        return res.json(url);

    } catch (error) {
        console.log("TCL: error", error)
        return res.status(500).json('Internal Server Error.');
    }
});

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        });
        if (!url) {
            return res.status(404).json('No url found');
        }

        return res.redirect(url.longUrl);
    } catch (error) {
        console.log("TCL: error", error)
        return res.status(500).json('Internal Server Error.');
    }
});

module.exports = router;