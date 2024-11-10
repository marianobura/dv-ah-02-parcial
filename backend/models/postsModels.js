const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    reactions: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        }
    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

// {
//     "title": "",
//     "body": "",
//     "tags": [],
//     "reactions": {
//         "likes": ,
//         "dislikes":
//     },
//     "views": ,
//     "userId": ""
// }