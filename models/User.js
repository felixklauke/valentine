let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    auth: {
        googleId: String
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;