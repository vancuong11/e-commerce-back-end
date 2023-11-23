import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordChangeAt: {
            type: String,
        },
        role: {
            type: String,
            default: 'user',
        },
        cart: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
            },
        ],
        address: {
            type: Array,
            default: [],
        },
        wishList: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            },
        ],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refresh_token: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('User', userSchema);
