const db = require("../models");
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

    Layout.find().then((layouts) => {
      
      let itemArray = [];
      //If this is a new layout, fill it with 128 empty objects.
      if(layouts.length <= 0){
          itemArray = new Array(128).fill({});
      }
      const layout = new Layout({
        title: "New Layout",
        url: 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png',
        gridPosition: layouts.length,
        items: [
            {

            }
        ]
      });
  
      console.log("layout:", layout);
    
      layout.save(layout)
      .then(data => {
        console.log("saveLayout:", data)
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
    console.log("updating:", req.params);
    console.log("body:", req.body);
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