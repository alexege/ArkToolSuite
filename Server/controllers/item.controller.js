const db = require("../models");
const Item = db.item;

// Retrieve all Items from the database.
exports.findAllItems = (req, res) => {
  Item.find()
  .sort([["gridPosition", "ascending"]])
  .then(items => {
    res.send(items);
  })
  .catch(err => {
    console.log(err);
  })
  
  // .sort([["createdAt", "descending"]])
};

// Create and Save a new Item
exports.addItem = (req, res) => {

  Item.find().then((items) => {
    console.log("items:", items.length);

    //If no image is provided, generate a random one
    let url_link = null;
    let seed = Math.floor(Math.random() * 400);
    if(req.body.url){
      url_link = req.body.url
    } else {
      url_link = `https://picsum.photos/id/${seed}/300/300`
    }

    const item = new Item({
      title: req.body.title || "Default Title",
      url: url_link,
      description: req.body.description || "Default Description",
      gridPosition: items.length
    });

    console.log("item:", item);
  
    item.save(item)
    .then(data => {
      console.log("saveItem:", data)
      res.send(data)
    })
    .catch(err => {
      console.log("err:", err);
    })
  })

  // const item = new Item({
  //   title: req.body.title,
  //   url: req.body.url,
  //   description: req.body.description,
  //   // gridPosition: count + 1
  // });

  // item.save(item)
  // .then(data => {
  //   res.send(data)
  // })
  // .catch(err => {
  //   console.log("err:", err);
  // })
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  Item.findOne({ _id: req.params.id })
  .then((item) => {
    res.send({ item });
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  console.log("updating:", req.params);
  console.log("body:", req.body);
  let updateData = {
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    gridPosition: req.body.gridPosition
  };

  Item.findByIdAndUpdate({ _id: req.params.id }, updateData)
  .then(item => {
    res.status(200).send({ item });
  })
  .catch(err => {
    res.status(500).send({ message: err });
  })
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  Item.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).send({ message: "Item deleted"});
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  
};