import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
title:{type:String,required:true},
content:{type:String,required:true},
createdAt:{type:Date,default:Date.now},

},{timestamps:true});

const Note = mongoose.model("Note",noteSchema)
// module.exports=Note;
export default Note;