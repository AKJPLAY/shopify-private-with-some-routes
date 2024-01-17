const express = require("express");
const bodyParser = require("body-parser");
const axios =  require("axios");
const cors =  require('cors');
const dotenv =  require("dotenv");

const app = express();
app.use(bodyParser.json());

var allowlist = ['https://primepackessentials.com', 'https://73538f-4.myshopify.com', 'https://admin.shopify.com']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials : true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
dotenv.config();

const auth = Buffer.from(
  process.env.SHOPIFY_API_KEY + ":" + process.env.ACCESS_TOKEN
).toString("base64");

const shopRequestHeaders = {
  "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
  Authorization: "Basic " + auth
};

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to amazing shop",
    discounts,
    variants
  });
});



app.get("/products", (req, res) => {
  const shopRequestUrl =  `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products.json`;
  return axios
    .get(shopRequestUrl, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(200).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.get("/get-price", (req, res) => {
  
  return axios
    .get(shopRequestUrl, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(200).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});


app.get("/get_product", (req, res) => {
  //body data pass example
  // {
  //     "title": "PRODUCT TITLE",
  //     "price": 2450
  // }
  const { product_id } = req.query;
  console.log(product_id);
  const shopRequestUrl =  `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products/${product_id}.json`;

  const post_data = req.body || {};

  console.log(post_data);
  axios
    .get(shopRequestUrl, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(201).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.post("/create-variant", (req, res) => {

  //body data pass example
  // {
  //     "option1": "VARIANT TITLE",
  //     "price": 2450
  // }

  const { product_id } = req.query;
  console.log(product_id);
  const shopRequestUrl =  `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products/${product_id}.json`;
  

  const post_data = req.body || {};

  console.log(post_data);
  axios
    .post(shopRequestUrl, post_data, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(201).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// Route to update a product
app.put("/update-product/:product_id", (req, res) => {
  const { product_id } = req.params;
  const shopRequestUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products/${product_id}.json`;

  const update_data = req.body || {};

  axios
    .put(shopRequestUrl, { product: update_data }, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(200).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// Route to delete a variant from a product
app.delete("/delete-variant/:product_id/:variant_id", (req, res) => {
  const { product_id, variant_id } = req.params;
  const shopRequestUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products/${product_id}/variants/${variant_id}.json`;

  axios
    .delete(shopRequestUrl, { headers: shopRequestHeaders })
    .then(() => {
      res.status(204).send();  // 204 No Content indicates a successful deletion
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});
 
// Route to add a variant to a product
app.post("/add-variant/:product_id", (req, res) => {
  const { product_id } = req.params;
  const shopRequestUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2020-04/products/${product_id}/variants.json`;

  const new_variant_data = req.body || {};

  axios
    .post(shopRequestUrl, { variant: new_variant_data }, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(201).send(shopResponse.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
}); 


app.delete("/create-variant", (req, res) => {
  const post_data = req.body || {};
  console.log(post_data);
  axios
    .post(shopRequestUrl, post_data, { headers: shopRequestHeaders })
    .then(shopResponse => {
      res.status(201).send(shopResponse.data);
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send(error.message);
    });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
