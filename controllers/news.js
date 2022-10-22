const News = require('../models/news');

const getNews = async (req , res) => {
    try{

        const active = req.params.active || true;

        const data = await News.find({archiveDate: {$exists:active}});

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

        const {id, ...fields} = req.body;

        await News.findByIdAndUpdate(idNews, fields, {new: true})
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

const deleteNews = async (req,res) =>{

    try{

        const idNews = req.body.id;

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

module.exports = {
    getNews,
    updateNews,
    createNews,
    deleteNews
}
