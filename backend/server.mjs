import mysql2 from "mysql2"
import express from "express"
import cors from "cors"


let port = 2021
let app = express()
app.use(cors()).listen(port , ()=>{
    console.log(`server  is running  on port ${port}`)
})

app.use(cors())
app.use(express.json())


const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'karuna',
    password:"16771677",
    database:"yadav"

})

connection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("mysql connected")

    }

})

app.get('/allusers', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, [], (err, results, fields) => {
        if (err) {
           
            return res.status(500).json({ error: 'Error in loading the data', details: err });
        }
        res.status(200).json(results);
    });
});



app.post("/create", (req, res) => {
    const { u_name, age, village } = req.body;

    let query = `INSERT INTO users (u_name, age, village) VALUES (?, ?, ?)`;

    connection.query(query, [u_name, age, village], (err, results, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'An error occurred while inserting the user' });
        } else {
            res.status(200).json({ message: 'User inserted successfully', userId: results.insertId });
        }
    });
});





app.put("/update/:id", (req, res) => {
    
    const { u_name, age, village } = req.body;  
    const { id } = req.params;  

    const query = `UPDATE users 
                   SET u_name = ?, age = ?, village = ? 
                   WHERE id = ?`;

    connection.query(query, [u_name, age, village, id], (err, result, fields) => {
        if (err) {
            
            console.error(err);
            res.status(500).send("Failed to update user");
        } else {
            res.status(200).send("User updated successfully");
        }
    });
});






app.delete("/delete/:id", (req, res) => {
    const { id } = req.params; 
    console.log("from delet api");

     console.log(req.body)
    console.log("from delete api")

    const query = `DELETE FROM users WHERE id = ?`;

    connection.query(query, [id], (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete user");
        } else if (result.affectedRows === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send("User deleted successfully");
        }
    });
});
















