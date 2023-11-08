import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import mongoose, { mongo } from "mongoose";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/noteDB", { useNewUrlParser: true });      // useNewUrlParser: true is used to handle the deprecation warning related to the MongoDB connection string parser.

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Note = new mongoose.model("Note", noteSchema);

// fetching all the notes

app.get("/api/allNotes", (req, res) => {
    Note.find({})
        .then((notes) => {
            res.status(200).send(notes);
        })
        .catch((err) => {
            console.log(err);
        })
});

// adding a new note

app.post("/api/addNote", (req, res) => {
    const { title, content } = req.body;

    const newNote = new Note({
        title: title,
        description: content
    });

    newNote.save();

    Note.find({})
        .then((notes) => {
            res.status(200).send(notes);
        })
        .catch((err) => {
            console.log(err);
        })
});

// deleting a note

app.post("/api/delete", (req, res) => {
    const { id } = req.body;

    Note.deleteOne({ _id: id })
        .then(() => {
            Note.find({})
                .then((notes) => {
                    res.status(200).send(notes);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT || 3001, function() {
            console.log("Server started on port 3001");
        });
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });