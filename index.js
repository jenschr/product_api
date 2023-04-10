const express = require("express");
const app = express();
const morgan = require("morgan");
const products = require("./routes/products");
const cors = require("cors");
const ProductModel = require("./models/productModel");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/Products")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error:", error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/products", products);

app.get("/", function (req, res) {
  // Provide a basic HTML page on the root of the server
  res.write("<!DOCTYPE html>");
  res.write("<html style='font-family: Roboto, Arial, sans-serif;'>");
  res.write("<head><title>REST API</title></head>");
  res.write("<body><p>/products is implemented</p></body>");
  res.write("</html>");
  res.end();
});

async function checkForDataInDatabase() {
  const products = await ProductModel.find();
  // If nothing in the database, let's just add some?
  if (products.length == 0) {
    const productInstance1 = new ProductModel({
      name: "Apples",
      categories: ["Fruits"],
    });
    const productInstance2 = new ProductModel({
      name: "Avocado",
      categories: ["Berries"],
    });
    const productInstance3 = new ProductModel({
      name: "Bananas",
      categories: ["Fruits"],
    });
    const productInstance4 = new ProductModel({
      name: "Basil",
      categories: ["Herbs"],
    });
    const productInstance5 = new ProductModel({
      name: "Bread",
      categories: ["Processed"],
    });
    const productInstance6 = new ProductModel({
      name: "Broccoli",
      categories: ["Vegetable"],
    });
    const productInstance7 = new ProductModel({
      name: "Butter",
      categories: ["Dairy"],
    });
    const productInstance8 = new ProductModel({
      name: "Carrots",
      categories: ["Vegetables"],
    });
    const productInstance9 = new ProductModel({
      name: "Cereal",
      categories: ["Processed"],
    });
    const productInstance10 = new ProductModel({
      name: "Chicken",
      categories: ["Meat"],
    });
    const productInstance11 = new ProductModel({
      name: "Cheese",
      categories: ["Dairy"],
    });
    const productInstance12 = new ProductModel({
      name: "Chilli powder",
      categories: ["Spice"],
    });
    const productInstance13 = new ProductModel({
      name: "Coffee",
      categories: ["Drink"],
    });
    const productInstance14 = new ProductModel({
      name: "Coriander",
      categories: ["Herbs"],
    });
    const productInstance15 = new ProductModel({
      name: "Cucumber",
      categories: ["Vegetable"],
    });
    await productInstance1.save();
    await productInstance2.save();
    await productInstance3.save();
    await productInstance4.save();
    await productInstance5.save();
    await productInstance6.save();
    await productInstance7.save();
    await productInstance8.save();
    await productInstance9.save();
    await productInstance10.save();
    await productInstance11.save();
    await productInstance12.save();
    await productInstance13.save();
    await productInstance14.save();
    await productInstance15.save();
    console.log("Added 15 products since the database was empty!");
  } else {
    console.log("products", products.length);
  }
}
checkForDataInDatabase();

app.listen(3001);
