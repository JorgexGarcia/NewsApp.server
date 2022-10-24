
const express = require('express');
const { dbConnection } = require('./database/config');
const socketIo = require("socket.io");
const http = require("http");
require ('dotenv').config();
const cors = require('cors');
const { getNewsWS, updateNewsWS, deleteNewsWS} = require('./controllers/news');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = new http.Server(app);

_ = dbConnection();

const io = new socketIo.Server(httpServer, {cors: {origin: '*'}});

io.on('connection', function (client) {

    client.on('event', async function (response) {
        const { type , updateNews, deleteNews } = response;
        const data = {
            error: null,
            newsNews: null,
            archiveNews: null
        }
        let temp;
        if(updateNews != null){
            temp = await updateNewsWS(type, updateNews);
        }else if (deleteNews != null){
            temp = await deleteNewsWS(type, deleteNews);

        }else{
            temp = await getNewsWS(type);
        }
        if(temp){
            if(!type){
                data.newsNews = temp;
            }else{
                data.archiveNews = temp;
            }
        }else{
            data.error = 'Error Ws';
        }
        io.emit('news', data);
    });

});

app.use('/api/news', require('./routes/news'));

httpServer.listen(process.env.PORTWS, function () {
    console.log('Server WS up and running');
});

app.listen(process.env.PORT, () => {
    console.log('Server up and running');
    }
);
