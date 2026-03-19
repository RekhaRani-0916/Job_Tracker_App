const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/Job");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rekharani0916_db_user:JobTracker%401109@vetcarecluster.bkuvdkn.mongodb.net/jobtracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.get("/jobs", async (req, res) => {
    try {
        const jobs =  await Job.find();
        res.json(jobs);
    }

    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/jobs", async (req, res) => {
    try {
        const job = new Job(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    }

    catch(err) {
        res.status(400).json({ message: err.message });
    }
});

app.put("/jobs/:id", async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        res.json(updatedJob);
    }

    catch(err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete("/jobs/:id", async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    }

    catch(err){
        res.status(500).json({ message: err.message});
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});