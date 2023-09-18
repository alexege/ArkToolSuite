const db = require("../models");
const Item = db.item;
const Layout = db.layout;

exports.findAllLayouts = (req, res) => {
    Layout.find()
    .then(layouts => {
        res.send(layouts);
    })
    .catch(err => {
        console.log(err);
    })
};

// Create and Save a new Layout
exports.addLayout = (req, res) => {
    // let x = new Array(130).fill(new Item);
    // x[4]._id = "this is my id";
    // console.log("x:", x[4]);

    Layout.find()
    .then((layouts) => {
        console.log("--------------layouts--------------:", layouts)
      let seed = Math.floor(Math.random() *  400);
      //If this is a new layout, fill it with 128 empty objects.

      const emptyArr = new Array(5).fill({});

      const layout = new Layout({
        title: "New Layout",
        url: 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png',
        gridPosition: layouts.length,
        // items: emptyArr
        // items: new Array(128).fill({
        //     url: `https://picsum.photos/id/${seed}/300/300`
        // })
      });

      if(layout.items){
          for(let i = 0; i < 130; i++){
            let emptyItem = new Item({ 
                url: 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png',
                gridPosition: i,
                unique: false
            })
            emptyItem.save()
            layout.items.push(emptyItem)
          }
      }

    //   layout.items.push(item1);

      layout.save(layout)
      .then(data => {
        console.log("success:", data);
        res.send(data)
      })
      .catch(err => {
        console.log("err:", err);
      })
    })
    
  
    // const layout = new Layout({
    //   title: req.body.title,
    //   url: req.body.url,
    //   description: req.body.description,
    //   // gridPosition: count + 1
    // });
  
    // layout.save(layout)
    // .then(data => {
    //   res.send(data)
    // })
    // .catch(err => {
    //   console.log("err:", err);
    // })
  };
  
  // Find a single Layout with an id
  exports.findOne = (req, res) => {
    Layout.findOne({ _id: req.params.id })
    .populate("items")
    .then((layout) => {
      res.send({ layout });
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
  };
  
  // Update a Layout by the id in the request
  exports.update = (req, res) => {
    let updateData = {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      gridPosition: req.body.gridPosition
    };
  
    Layout.findByIdAndUpdate({ _id: req.params.id }, updateData)
    .then(layout => {
      res.status(200).send({ layout });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    })
  };
  
  // Delete a Layout with the specified id in the request
  exports.delete = (req, res) => {
    console.log("Deleting layout");
    Layout.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send({ message: "Layout deleted"});
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    })
  };
  
  // Delete all Layouts from the database.
  exports.deleteAll = (req, res) => {
    
  };