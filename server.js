const express = require('express');
const app = express();
const { readFile, writeFile } = require('fs');
const path = require('path');
let count = 0;

readFile('./public/data/product-data.json', 'utf-8', (err, res) => {
    let data = JSON.parse(res);
    data.map(d => {
      d.id = count;
      count++;
    })
    let newData = JSON.stringify(data);
  });
  writeFile('./public/data/data.json', newData, (err, res) => {
    console.log(res)
  })
const addItem = () => {}
app.use(express.static(__dirname));
app.use(express.static('public'));
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/index.html'));
})
// This is the route for shop which is in the homepage
app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/about.html'));
})
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/order.html'));
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/contact.html'));
})
// This is the route for admin Dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
})

// Creating routes for each product in JSON file
readFile('./public/data/data.json', 'utf-8', (err, res) => {
  let data = JSON.parse(res);
  data.forEach(d => {
    app.get(`/${d.id}`, (req, res) => {
      res.sendFile(path.join(__dirname + '/public/product.html'));
    })    
    
  })
}) 

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});