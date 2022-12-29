const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    userName: { type: String, required: true, maxLength: 15, minLength: 1 },
    // likes: { type: Number, default: 0 },
    // dislikes: { type: Number, default: 0 },
    // comments: { type: Schema.Types.ObjectId, ref: "Comment"},
    isAdmin: {type: Boolean, default: false},
    dateJoined: { type: Date, default: Date.now }
})

UserSchema.virtual("url").get(function () {
    return `group/user/${this.id}`;
})



module.exports = mongoose.model("User", UserSchema)