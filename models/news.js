
const { Schema, model} = require('mongoose');

const NewsSchema = Schema ({

    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    archiveDate: {
        type: Date
    }
});

NewsSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('News', NewsSchema);
