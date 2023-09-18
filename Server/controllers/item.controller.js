const db = require("../models");
const Layout = require("../models/layout.model");
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
    
    let dinoList = [
    "achatina",
    "allosaurus",
    "amargasaurus",
    "ammonite",
    "andrewsarchus",
    "angler",
    "ankylosaurus",
    "araneo",
    "archaeopteryx",
    "argentavis",
    "arthropluera",
    "astrocetus",
    "astrodelphis",
    "attackdrone",
    "baryonyx",
    "basilisk",
    "basilosaurus",
    "beelzebufo",
    "beyla",
    "beylaspawn",
    "bladewasp",
    "bloodstalker",
    "brontosaurus",
    "broodmotherlysrix",
    "bulbdog",
    "carbonemys",
    "carcharodontosaurus",
    "carnotaurus",
    "castoroides",
    "chalicotherium",
    "cnidaria",
    "coelacanth",
    "compy",
    "corruptedmastercontroller",
    "crystalwyvern",
    "crystalwyvernqueen",
    "daeodon",
    "deathworm",
    "defenseunit",
    "deinonychus",
    "deserttitan",
    "desmodus",
    "dilophosaur",
    "dimetrodon",
    "dimorphodon",
    "dinopithecus",
    "dinopithecusking",
    "diplocaulus",
    "diplodocus",
    "direbear",
    "direwolf",
    "dodo",
    "doedicurus",
    "dragon",
    "dungbeetle",
    "dunkleosteus",
    "electrophorus",
    "enforcer",
    "equus",
    "eurypterid",
    "fasolasuchus",
    "featherlight",
    "fenrir",
    "ferox",
    "fjordhawk",
    "foresttitan",
    "gacha",
    "gallimimus",
    "gasbags",
    "giantbee",
    "giganotosaurus",
    "gigantopithecus",
    "gigantoraptor",
    "glowbug",
    "glowtail",
    "griffin",
    "hatiskoll",
    "Health",
    "hesperornis",
    "hyaenodon",
    "icetitan",
    "ichthyornis",
    "ichthyosaurus",
    "iguanodon",
    "jerboa",
    "jugbug",
    "kairuku",
    "kaprosuchus",
    "karkinos",
    "kentrosaurus",
    "kingtitan",
    "lamprey",
    "leech",
    "leedsichthys",
    "liopleurodon",
    "lymantria",
    "lystrosaurus",
    "maewing",
    "magmasaur",
    "mammoth",
    "managarmr",
    "manta",
    "manticore",
    "mantis",
    "megachelon",
    "megalania",
    "megaloceros",
    "megalodon",
    "megalosaurus",
    "megamek",
    "meganeura",
    "megapithecus",
    "megatherium",
    "mek",
    "mesopithecus",
    "microraptor",
    "moeder",
    "morellatops",
    "mosasaurus",
    "moschops",
    "nameless",
    "noglin",
    "onyc",
    "otter",
    "overseer",
    "oviraptor",
    "ovis",
    "pachy",
    "pachyrhinosaurus",
    "paracer",
    "parakeetfishschool",
    "parasaur",
    "pegomastax",
    "pelagornis",
    "phiomia",
    "phoenix",
    "piranha",
    "plesiosaur",
    "procoptodon",
    "pteranodon",
    "pulmonoscorpius",
    "purlovia",
    "quetzal",
    "raptor",
    "ravager",
    "reaper",
    "rex",
    "rhyniognatha",
    "rockdrake",
    "rockelemental",
    "rockwell",
    "rollrat",
    "sabertooth",
    "sarco",
    "scout",
    "seeker",
    "shadowmane",
    "shinehorn",
    "sinomacrops",
    "snowowl",
    "spinosaur",
    "stegosaurus",
    "steinbjorn",
    "stryder",
    "tapejara",
    "terrorbird",
    "therizinosaurus",
    "thornydragon",
    "thylacoleo",
    "titanoboa",
    "titanomyrma",
    "titanosaur",
    "triceratops",
    "trilobite",
    "troodon",
    "tropeognathus",
    "tusoteuthis",
    "unicorn",
    "velonasaur",
    "voidwyrm",
    "vulture",
    "woollyrhino",
    "wyvern",
    "yeti",
    "yutyrannus"
   ]

    let randomDino = dinoList[Math.floor(Math.random()*dinoList.length)]


    if(req.body.url){
      url_link = req.body.url
    } else {
      url_link = `src/assets/dinos/${randomDino}.png`
      // url_link = `https://picsum.photos/id/${seed}/300/300`
    }

    const item = new Item({
      title: req.body.title || randomDino || "Default Title",
      url: url_link,
      description: req.body.description || "Default Description",
      gridPosition: items.length,
      unique: true
    });
 
    item.save(item)
    .then(data => {
      console.log("saveItem:", data)
      res.send(data)
    })
    .catch(err => {
      console.log("err:", err);
    })

    console.log('req.body:', req.body);

    // Layout.findOne({
    //   _id: "65076cfe41afa9c42b6f94dc"
    // })
    // .then((layout) => {
    //   layout.items.push(item)
    //   layout.save()
    // })
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