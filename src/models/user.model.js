var mongoose = require('mongoose');
const { stringify } = require('querystring');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    'firstname': String,
    'lastname': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'email': String,
    'password': String,
})
module.exports = mongoose.model('User', UserSchema)