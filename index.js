const app = require('express')();
const fileUpload = require("express-fileupload");
const csv = require("fast-csv");
const {MongoClient} = require("mongodb");

//add your config for mongodb here
const dbConfig = {
    mongo: {
        dbname: "",
        url: "",
    },
};

app.use(fileUpload());

app.post('/users/csv', uploadUsersFromCsv);
app.get('/users/csv', getUsersAsCsv);
app.get('/users/json', getUsersAsJson);

run().catch(console.error);


async function uploadUsersFromCsv(req, res) {
    try {
        const db = req.app.get('db');
        if (!req.files || !req.files.users) {
            return res.status(400).send('No files were uploaded.');
        }

        const {data: file} = req.files.users;
        const users = await parseCsv(file);
        await db.collection("users").insertMany(users);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `${err}`,
        });
    }
}

async function getUsersAsCsv(req, res) {
    const db = req.app.get('db');

    res.setHeader('Content-disposition', 'attachment; filename=users.csv');
    const users = db.collection("users").find().project({'_id': 0}).stream();
    const csvStream = csv.format({headers: true});
    csvStream.pipe(res);
    users.pipe(csvStream);
}

async function getUsersAsJson(req, res) {
    try {
        const db = req.app.get('db');
        const users = await db.collection("users").find().project({'_id': 0}).toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `${err}`,
        });
    }
}

async function connect() {
    const client = await new MongoClient.connect(dbConfig.mongo.url, {useUnifiedTopology: true});
    return client.db(dbConfig.mongo.dbname);
}

async function run() {
    app.set('db', await connect());
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
}

async function parseCsv(data) {
    return new Promise((resolve, reject) => {
        const rows = [];
        const stream = csv.parse({headers: true})
            .on('error', reject)
            .on('data', row => rows.push(row))
            .on('end', () => resolve(rows));
        stream.write(data);
        stream.end();
    })
}
