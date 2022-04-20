let express = require("express");
let app = express();
let parser = require("body-parser");
let mongoClient = require("mongodb").MongoClient;
let cors = require("cors");

let dbURL = "mongodb://localhost:27017";
// express server port
let PORT = 3001;

app.use(parser.json());
app.use(cors());
app.listen(PORT, () => console.log('server is running in 3001'))
app.get("/users", (request, response) => {
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            let doc = db.collection("user").find();
            let users = [];
            doc.forEach((document, err)=>{
                if(err) {
                    throw err;
                } else {
                    users.push(document);
                }
            }, ()=>{
                response.json(users);
                client.close();
            });
        }
    })
});