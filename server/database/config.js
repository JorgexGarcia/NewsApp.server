const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.BD);
        console.log('DB online');

    } catch (error) {

        console.log(error);
        throw new Error('Error');

    }
}

module.exports = {
    dbConnection
}
