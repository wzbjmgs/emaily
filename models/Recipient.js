const mongoose = require('mongoose');

//following two expression are equvialnt.
// const Schema = mongoose.Schema;
//mongoose has a property called Schema
//and assign that property to Schema variable.
const { Schema } = mongoose;

//descripe all different properties we have
const recipientSchema = new Schema({
  email: String,
  respond: { type: Boolean, default: false }
});

//tell mongo to create a new collection
//users is the name of the collection
//second variable is the schema of this new collection
//two variables mean we are going to load something new into db
module.exports = recipientSchema;
