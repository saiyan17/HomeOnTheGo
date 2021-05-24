const mongoose=require('mongoose');
const cities=require('./cities');
const Campground=require('../models/campground');
const {places,descriptors}=require('./seedHelpers');

console.log(places[0]);



mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()* array.length)];
const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i = 0; i < 50 ; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const camp=new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                image: 'https://source.unsplash.com/collection/1862377/rooms',
                title: `${sample(descriptors)} ${sample(places)}` ,                
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel necessitatibus atque quo perspiciatis vitae. Corporis illo corrupti, adipisci eligendi natus amet odit laborum quo labore, dolorem ducimus, laboriosam cum tempore?'
                
            })
            await camp.save();
    }
   
}
seedDB().then(()=>{
    mongoose.connection.close();
});