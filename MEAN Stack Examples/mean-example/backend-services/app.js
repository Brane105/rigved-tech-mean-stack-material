// import all the functions
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
let mongoClient = require("mongodb").MongoClient;
let PORT = 3001;
let dbURL = "mongodb://localhost:27017";
// start the server 
app.listen(PORT, () => console.log(`Server is running in ${PORT}`));

// apply the middleware
app.use(cors());
app.use(bodyParser.json());

//create the services for contact app
// storing the profile 
app.post("/profile", (request, response) => {
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            let profile = request.body; // _id, name, phone, dob, password, contacts:[];
            profile.contacts = [];
            db.collection("profile").insertOne(profile, (err, res) => {
                if(err) {
                    response.status(409).json({"message":`Profile ${profile._id} exists`})
                } else {
                    response.status(201).json(res);
                    client.close();
                }
            });
        }
    });
});

//adding contacts
app.put("/profile/:id/addContact", (request, response) => { 
    let id = parseInt(request.params.id);
    let contact = request.body;
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").updateOne({_id: id}, {$push: {contacts: contact}})
            .then((doc) => {
                response.json(doc);
                client.close();
            });
        }
    });
});

//login service
app.get("/profile/:id/:password", (request, response) => { 
    let id = parseInt(request.params.id);
    let pass = request.params.password;
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").findOne({_id: id, password: pass})
            .then((doc) => {
                if(doc!=null) {
                    response.json(doc)
                } else {
                    response.status(404).json({"message":`Sorry id or password is wrong`})
                }
                client.close();
            });
        }
    });
});

// find a contact of a particular profile
app.get("/profile/:id/contacts/:contactId", (request, response) => {
    let id = parseInt(request.params.id);
    let contactId = parseInt(request.params.contactId);
    console.log(contactId);
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").findOne({_id: id})
            .then(doc => {
                if(doc != null) {
                    let contacts = doc.contacts;
                    console.log('doc contacts: '+doc.contacts);
                    let counter = 0;
                    for(let i = 0; i < contacts.length; i++) {
                        if(contacts[i]._id == contactId) {
                            counter++;
                            response.json(contacts[i]);
                            break;
                        }
                    }
                    if(counter == 0) {
                        contacts = [];
                        response.json(contacts);
                    }
                } else {
                    response.json({'message': `Sorry wrong id: ${id}`})
                }
                client.close();
            });
        }
    });
});

//Complete other services here
// delete the particular contact based on profile id: /profile/:id/contacts/:contactId

// show all contacts based on profile id: /profile/:id/contacts

// update the contact phone number of a partiular profile id: /profile/:id/contacts/:contactId/phone/:num


// update the phone number of particular profile id: /profile/:id/phone/:num

// update the dob of particualr profile id: /profile/:id/dob/:dob

// update the password of particular profile id: /profile/:id/password/:pass

