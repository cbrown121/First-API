// Importing express that allows to setup differnt handler requests
import express from "express";
// Importing axios to simplify making HTTP requests and response interceptions
import axios from "axios";
// Importing body parser middleware
import bodyParser from "body-parser";



// Depolying the express app
const app = express();
// Setting the port to listen on port 3000
const port = 3000;

//API endpoint for art objects
const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

// Use the public folder for static files.
app.use(express.static("public"));

// Middleware for parsing data
app.use(bodyParser.urlencoded({ extended: true }));

// Getting the initial page and waiting for data
app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
  });

// Post request to submit ID for artwork
app.post("/get-art", async (req, res) => {
    const searchId = req.body.id;
    try {
        // Try to get the API resource
        const result = await axios.get(API_URL + searchId);
        // Pass the API data to the index.ejs page

        // Log entire API data
        console.log("API Response:", result.data);

        // Log specific fields for clarity
        console.log("Primary Image URL:", result.data.primaryImage);


        res.render("index.ejs", {
            /* 
            secret: result.data.secret,
            user: result.data.username, 
            */
           title: result.data.title,
           primaryImage: result.data.primaryImage,
           objectID: result.data.objectID,
        });

        console.log(result.data.primaryImage);
        
    // If the API data cannot be requested, pass an error response
    } catch (error) {
        // Error response for console
        console.log(error.response.data);
        // Respond to user with internal server error code
        res.status(500);
    }
});


// Server is listening on port 3000
app.listen(port, () => {
    // Console log that the server is running on selected port
    console.log(`Server is running on port ${port}`);
});