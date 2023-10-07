const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numberViews: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        image: {
            type: String,
            default:
                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fotor.com%2Fblog%2F11-youtube-thumbnail-design-ideas%2F&psig=AOvVaw0J2wlLuV50SEWV7Rrk-4es&ust=1696752780231000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICl4Oe-44EDFQAAAAAdAAAAABAE',
        },
        author: {
            type: String,
            default: 'Admin',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
