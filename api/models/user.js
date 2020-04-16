const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
    name: {
			type: String,
			required: true,
			trim: true
		},
    email: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
    password: {
			type: String,
			required: true,
			trim: true
		}
}, {
    timestamps: true
});

module.exports = mongoose.model('user', user);
