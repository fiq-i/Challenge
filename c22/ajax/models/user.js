let mongoose = require('mongoose');
let Schema = mongoose.Schema;

userSchema = new Schema({
	unique_id: Number,
	string: String,
	integer: Number,
	float: Number,
	date: Date,
	boolean: Boolean
}),
User = mongoose.model('user', userSchema);

module.exports = User;