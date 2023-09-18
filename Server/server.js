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
require('./routes/item.routes')(app);
require('./routes/layout.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Seed the database with some starting values

function initial() {
  Item.estimatedDocumentCount()
  .then((count) => {
    console.log("itemCount: ", count);

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

       for(let i = 0; i < dinoList.length; i++){
    
        let dino = dinoList[i]
    
        const item = new Item({
          title: dino || "Default Title",
          url: `src/assets/dinos/${dino}.png`,
          description: "Default Description",
          unique: true
        });
     
        item.save(item)
        .then(data => {
          console.log("saveItem:", data)
          // count.send(data)
        })
        .catch(err => {
          console.log("err:", err);
        })
      }

    }
  })
}

// function initial() {
//   console.log("Seeding database!");
//   Item.estimatedDocumentCount()
//   .then(res => {
//     if (res)
//     console.log("result:", res);
//     // if (count === 0) {
//       new Item({
//         title: 'This is a title',
//         url: 'src/assets/dinos/maewing.png',
//         unique: true
//       })
//       .save()
//       .then((res) => {
//         console.log("res:", res);
//       })
//       .catch(err => {
//         console.log('error:', err);
//       })

//       let item = new Item({
//         title: 'test',
//         url: 'src/assets/dinos/maewing.png',
//         unique: true
//       })

//       item.save(item)
//       .then(data => {
//         console.log("save: ", data)

//       })
//       .catch(err => {
//         console.log("err:", err)
//       })

//     // }
//   })
//   .catch(err => {
//     if (err) {
//       console.log("error:", err);
//     }
//   });


// }