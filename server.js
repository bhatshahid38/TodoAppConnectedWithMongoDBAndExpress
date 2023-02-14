// This line imports the 'express' library, which is a Node.js web application framework
const express = require("express");

// This line imports the 'todoModel' and 'mongodb' modules
// These modules define the schema for the Todo objects and connect to the MongoDB database, respectively
const todoModel = require("./models/Todoschema")
const mongodb = require("./config/moongse")

// This line creates an instance of the Express application
const app = express();

// This line imports the 'path' module, which is used to manipulate file paths
const path = require("path")

// This line imports the 'body-parser' middleware, which is used to parse incoming request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This line serves the static files located in the 'src' directory
app.use(express.static(path.join(__dirname, "src")))

// This line enables the use of the JSON format for request data
app.use(express.json());

// This is a middleware function that sets the 'Access-Control-Allow-Origin' and 'Access-Control-Allow-Headers' headers in the server response.
// This is necessary to allow cross-origin resource sharing (CORS), which enables a web page to access resources from a different domain.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // This line sets the value of the 'Access-Control-Allow-Origin' header to '*'
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // This line sets the value of the 'Access-Control-Allow-Headers' header
    next(); // This line calls the next middleware function in the chain
  });
  
  

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"))
})

// This line creates a new route that listens for POST requests to the '/todo' endpoint
app.post("/todo", (req, res) => {

    // This line creates a new Todo object with the properties specified in the request body
    todoModel.create({
      inputDiscription: req.body.inputDiscription,
      catagory: req.body.catagory,
      duedate: req.body.duedate
    }, (err, todoItem) => {
  
      // If there is an error creating the Todo object, this block is executed
      if (err) {
        console.log(err);
      }
  
      // If the Todo object is successfully created, this block is executed
      else {
        console.log("Sucess");
  
        // This line sends a JSON response containing the new Todo object
        res.json({ todoItem });
      }
    })
  })
  

app.get("/api",(req,res) => {
    todoModel.find({},(err,todo) =>{
        if(err){
            console.log("err")
        }
        else{
            res.json({todo});
        }
    })

})
app.post("/deleteApi", async (req,res)=>{
    const val = await todoModel.deleteOne({_id: req.body.id});
})


let port = 7600
app.listen(port)


