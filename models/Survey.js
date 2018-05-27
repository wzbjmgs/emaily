const mongoose = require('mongoose');

//following two expression are equvialnt.
// const Schema = mongoose.Schema;
//mongoose has a property called Schema
//and assign that property to Schema variable.
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

//descripe all different properties we have
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //a list of string, string array
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSend: Date,
  lastResponded: Date
});

//tell mongo to create a new collection
//users is the name of the collection
//second variable is the schema of this new collection
//two variables mean we are going to load something new into db
mongoose.model('surveys', surveySchema);
