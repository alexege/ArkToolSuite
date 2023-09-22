const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://127.0.0.1:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const dbConfig = require("./config/db.config");
const Item = require("./models/item.model");
const Layout = require("./models/layout.model");
const User = require("./models/user.model");
const Role = require("./models/role.model");
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to Mongodb!");
  //Trigger the database seeding if no items exist.
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Alex's bank layout application." });
});

//routes
require('./routes/auth.routes')(app);
require('./routes/item.routes')(app);
require('./routes/layout.routes')(app);
// require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Seed the database with some starting values

function initial() {
  Item.estimatedDocumentCount()
  .then((count) => {

    if(count == 0){

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

       for(let i = 0; i < dinoList.length; i++){
    
        let dino = dinoList[i]
    
        const item = new Item({
          title: dino || "Default Title",
          url: `src/assets/dinos/${dino}.png`,
          description: "Default Description",
          unique: true
        });
     
        item.save(item)
        .then(() => {
          //Do nothing
        })
        .catch(err => {
          console.log("err:", err);
        })
      }

    }
  })

  Layout.estimatedDocumentCount()
  .then((count) => {
    if(count == 0){
      const layout = new Layout({
        title: 'New Layout',
        url: 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png',
        items: [], //Modify this so it replicates how it is added elsewhere
      })

      layout.save(layout)
      .then((res) => {
        console.log("res:", res);
        //Do nothing
      })
      .catch(err => {
        console.log("err:", err);
      })
    }
  })

  //Roles

  Role.estimatedDocumentCount()
  .then((count) => {
    if (count === 0){

      //User
      const user = new Role({
        name: "user"
      })

      user.save(user)
      .then((res) => {
        console.log("Adding User role to database!");
      })
      .catch(err => {
        console.log("err:", err);
      })

      //Moderator
      const moderator = new Role({
        name: "moderator"
      })

      moderator.save(moderator)
      .then((res) => {
        console.log("Adding Moderator role to database!");
      })
      .catch(err => {
        console.log("err:", err);
      })

      //Admin
      const admin = new Role({
        name: "admin"
      })

      admin.save(admin)
      .then((res) => {
        console.log("Adding Admin role to database!");
      })
      .catch(err => {
        console.log("err:", err);
      })
    }
  })
}