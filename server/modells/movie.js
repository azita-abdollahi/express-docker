const mongoose= require("mongoose");
const schema= mongoose.Schema;
let movieSchema= new schema(
    {
        name: {type: String, required: true},
        description: {type: String, default: ""},
        category: [{type: String, required: true}],
        createdDate: { type: Date, default: Date.now}
    }
);
movieSchema.index({name: 1});
module.exports= mongoose.model("Movie", movieSchema);