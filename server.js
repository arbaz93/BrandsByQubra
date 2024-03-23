const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const { readFile, writeFile } = require('fs');
const path = require('path'); 
const fileDirect  = './public/data/data.json';
let count = 0;
let prodData = [];
const readDataFile = (filePath) => {
  readFile(filePath, 'utf-8', async (err, res) => {
    if(res) {
      let r = await res;
      let data = await JSON.parse(r);
      prodData = data;
    }
  })
}
readDataFile(fileDirect);

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(fileUpload());
app.post("/api", (request, response) => {
  let data = request.body;
  let operation = data.operation;
  if (operation == "add-item") {
    addItem(request);
  }
  if (operation == "remove-item") {
    removeItem(data);
  }
  response.json({
    status: "Data Upload Successfull",
    data: data
  })
  
})
const addItem = async (d) => {
  const data = await d;
  const item =  data.body;
  let image = data.files.image;
  item.image = './img/' + image.name;
  image.mv(__dirname + '/public/img/' + image.name);
  prodData.push(item);
  let newData = JSON.stringify(prodData);
    await writeFile(fileDirect, newData, (err, res) => {
  })
  giveItemsIds()
}
const removeItem = async (item) => {
  const itm = await item;
  let newData = prodData.map((product, i) => {
    if(product.id == item.id) {
      prodData.splice(i, 1)
    }
  })
  let sData = JSON.stringify(prodData, null, 2);
    await writeFile(fileDirect, sData, (err, res) => {
  })
  
    readDataFile(fileDirect);
giveItemsIds()
}
const giveItemsIds = async () => {
  prodData.forEach((prod, i) => {
    prod.id = i
  })
  let newData = JSON.stringify(prodData, null, 2);
    await writeFile(fileDirect, newData, (err, res) => {
  })
}

// export default count;
app.use(express.static(__dirname));
app.use(express.static('public'));
app.get('/', function (req, res) {
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
  console.log(req)
  res.sendFile(path.join(__dirname + '/public/admin.html'));
})

// Creating routes for each product in JSON file
const creatRoutes = () => {
    readFile(fileDirect, 'utf-8', (err, res) => {
      let data = JSON.parse(res);

      data.forEach(d => {
          app.get(`/${d.id}`, (req, res) => {
            res.sendFile(path.join(__dirname + '/public/product.html'));
          })
        })
    })
}
creatRoutes()
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});