import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

async function connection(){
    try {
        const connection = await mongoose.connect(process.env.URL)
        console.log("mongo connected");
        return connection
    } catch (error){
        console.log(`the connection problem ${error}`);
    }
}
const startConnection = await connection()


const customerSchema = new mongoose.Schema(
    { full_name: String, email: String, age: Number, Gender: String, preferred_course: String, confirm: String}
)

const Students = mongoose.model('Students', customerSchema);

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.listen(3000, ()=>{
    console.log("the server is ready: ");
})

app.post("/register", (req, res)=>{
    try {
        const student = new Students(req.body);
        Students.create(student)
        res.send("the student added succeffuly");
    } catch (error) {
        res.send(`the problem is in post register ${error}`)
    }
})

app.get("/student", async (req, res)=>{
    try {
        const allStudent = await Students.find({})
        res.send(allStudent)
    } catch (error) {
        res.send(`the problem is in get student: ${error}`)
    }
})