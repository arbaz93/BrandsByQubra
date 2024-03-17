const express = require('express');
const app = express();

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