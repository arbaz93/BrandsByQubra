const express = require('express');
const app = express();
const { readFile, writeFile } = require('fs');
let count = 0;
// readFile('./public/data/product-data.json', 'utf-8', (err, res) => {}
// readFile('./public/data/product-data.json', 'utf-8', (err, res) => {
//     let data = JSON.parse(res);
//     data.map(d => {
//       d.id = count;
//       count++;
//     })
//     let newData = JSON.stringify(data);
//     writeFile('./public/data/data.json', newData, (err, res) => {
//       console.log(res)
//     })
// });

app.use(express.static(__dirname));
app.use(express.static('public'));
app.get('*', function(req, res) {
res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
})

 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});