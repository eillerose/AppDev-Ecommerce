const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/tourRoutes");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use('/', routes);
app.use(express.static('public'))

app.listen(PORT || 8080, () => {
    console.log(`Server connected successfully to port ${PORT}...`);
})