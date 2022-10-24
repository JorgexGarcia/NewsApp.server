const News = require('../models/news');

const getNews = async (req , res) => {
    try{

        const active = req.params.active || true;

        const data = await News.find({archiveDate: {$exists:active}})
            .sort({'archiveDate' : -1});

        res.status(200).json({
            ok: true,
            data
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}

const getNewsWS = async (type) => {
    try{
        return await News.find({archiveDate: {$exists: type}})
            .sort({'archiveDate': -1});

    }catch (error) {
        return null;
    }
}

const createNews = async (req , res) => {
    try{
        const news = new News(req.body);

        await news.save();

        res.status(200).json({
            ok: true,
            msg: 'Create News',
            data: news
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}

const updateNews = async (req,res) =>{

    try{

        const idNews = req.body.id;

        const newsTemp = await News.findById(idNews);

        if(!newsTemp) {
            return res.status(404).json({
                ok: false,
                msg: 'Incorrect news'
            });
        }

        const { archiveDate } = req.body;

        const data = {
            archiveDate: archiveDate
        }

        await News.findByIdAndUpdate(idNews, data, {new: true})
            .then( data => {
                res.status(200).json({
                    ok: true,
                    data
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }

}

const updateNewsWS = async (type, id) =>{
    try{
        const newsTemp = await News.findById(id);
        if(!newsTemp) {
            return null;
        }
        const archiveDate = Date.now();
        const data = {
            archiveDate: archiveDate
        }
        await News.findByIdAndUpdate(id, data);
        return getNewsWS(type);
    }catch (error) {
        return null;
    }
}

const deleteNews = async (req,res) =>{

    try{

        const idNews = req.params.id;

        if(!idNews){
            return res.status(404).json({
                ok: false,
                msg: 'Incorrect news'
            });
        }

        const newsTemp = await News.findById(idNews);

        if(!newsTemp) {
            return res.status(404).json({
               ok: false,
               msg: 'Incorrect news'
            });
        }

        await News.findByIdAndDelete(idNews)
            .then( data => {
                res.status(200).json({
                    ok: true,
                    data
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error"
        });
    }

}

const deleteNewsWS = async (type, id) =>{
    try{
        const newsTemp = await News.findById(id);
        if(!newsTemp) {
            return null;
        }
        await News.findByIdAndDelete(id);
        return getNewsWS(type);
    }catch (error) {
        return null;
    }
}

module.exports = {
    getNews,
    getNewsWS,
    updateNews,
    updateNewsWS,
    createNews,
    deleteNews,
    deleteNewsWS
}
