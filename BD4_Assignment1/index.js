let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: "./BD4_Assignment1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

const fetchAllRestaurants = async () => {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);

  return { restaurants: response };
};

app.get('/restaurants', async (req, res) => {
  let results = await fetchAllRestaurants();
  res.status(200).json(results);
});


async function fetchAllRestaurantsById(id){
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let response = await db.all(query, [id]);

  return { restaurants: response };
};

app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchAllRestaurantsById(id);
  res.status(200).json(results);
});


async function fetchAllRestaurantsByCuisine(cuisine){
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);

  return { restaurants: response };
};

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  let results = await fetchAllRestaurantsByCuisine(cuisine);
  res.status(200).json(results);
});


async function fetchRestaurantsByisVeghasOutdoorSeatingisLuxury(isVeg, hasOutdoorSeating, isLuxury){
  let query = 'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating =? AND isLuxury =? ';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

  return { restaurants: response };
};

app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;

  let results = await fetchRestaurantsByisVeghasOutdoorSeatingisLuxury(isVeg, hasOutdoorSeating, isLuxury);
  res.status(200).json(results);
});


async function fetchAllRestaurantsSortedByRating(){
  let query = 'SELECT * FROM restaurants WHERE rating <= 4.5';
  let response = await db.all(query, []);

  return { restaurants: response };
};

app.get('/restaurants/sort-by-rating', async (req, res) => {
  let results = await fetchAllRestaurantsSortedByRating();
  res.status(200).json(results);
});


const fetchAllDishes = async () => {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);

  return { dishes: response };
};

app.get('/dishes', async (req, res) => {
  let results = await fetchAllDishes();
  res.status(200).json(results);
});


async function fetchAllDishesById(id){
  let query = 'SELECT * FROM dishes WHERE id = ?';
  let response = await db.all(query, [id]);

  return { dishes: response };
};

app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchAllDishesById(id);
  res.status(200).json(results);
});


async function fetchAllDishesByisVeg(isVeg){
  let query = 'SELECT * FROM dishes WHERE isVeg = ?';
  let response = await db.all(query, [isVeg]);

  return { dishes: response };
};

app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let results = await fetchAllDishesByisVeg(isVeg);
  res.status(200).json(results);
});


async function fetchAllDishesSortedByPrice(){
  let query = 'SELECT * FROM dishes WHERE price >= 250';
  let response = await db.all(query, []);

  return { dishes: response };
};

app.get('/dishes/sort-by-price', async (req, res) => {
  let results = await fetchAllDishesSortedByPrice();
  res.status(200).json(results);
});


app.listen(PORT, () => console.log("Server running on port 3000"));
