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

const discounts = [
  {
    quantity: 50,
    price_discounted: 0.76
  },
  {
    quantity: 75,
    price_discounted: 0.64
  },
  {
    quantity: 100,
    price_discounted: 0.59
  },
  {
    quantity: 150,
    price_discounted: 0.54
  },
  {
    quantity: 200,
    price_discounted: 0.51
  },
  {
    quantity: 250,
    price_discounted: 0.50
  },
  {
    quantity: 300,
    price_discounted: 0.49
  },
  {
    quantity: 400,
    price_discounted: 0.48
  },
  {
    quantity: 500,
    price_discounted: 0.47
  },
  {
    quantity: 600,
    price_discounted: 0.45
  },
  {
    quantity: 700,
    price_discounted: 0.43
  },
  {
    quantity: 800,
    price_discounted: 0.42
  },
  {
    quantity: 900,
    price_discounted: 0.42
  },
  {
    quantity: 1000,
    price_discounted: 0.41
  },
  {
    quantity: 1500,
    price_discounted: 0.39
  },
  {
    quantity: 2000,
    price_discounted: 0.38
  },
  {
    quantity: 3000,
    price_discounted: 0.34
  },
  {
    quantity: 4000,
    price_discounted: 0.32
  },
  {
    quantity: 5000,
    price_discounted: 0.31
  },
  {
    quantity: 10000,
    price_discounted: 0.29
  },
  {
    quantity: 15000,
    price_discounted: 0.27
  },
  {
    quantity: 20000,
    price_discounted: 0.26
  },
  {
    quantity: 30000,
    price_discounted: (1 - 0.75)
  },
  {
    quantity: 40000,
    price_discounted: (1 - 0.76)
  },
  {
    quantity: 50000,
    price_discounted: (1 - 0.77)
  }
];

const variants = [
  // Standard 
  {
    title: "Standard White with Matte Ink (HD Print) / Outside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 35.91,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 3.5
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Outside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 43.89,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 4.0
  },
  {
    title: "Premium White with Glossy Ink / Outside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 47.88,
    option1: 'Premium White with Glossy Ink',
    option2: 'Outside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 4.8
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Outside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 35.91,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Kraft (Brown) with Matte Ink (HD Print)'
  },

  {
    title: "Standard White with Matte Ink (HD Print) / Inside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 39.90,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 4.0
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Inside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 47.88,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)'
  },
  {
    title: "Premium White with Glossy Ink / Inside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 51.87,
    option1: 'Premium White with Glossy Ink',
    option2: 'Inside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 5.1
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Inside Only - Full Color / Standard (12 - 15 Business Days)",
    price: 39.90,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 3.9
  },

  {
    title: "Standard White with Matte Ink (HD Print) / Outside & Inside - Full Color / Standard (12 - 15 Business Days)",
    price: 59.85,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 5.9
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Outside & Inside - Full Color / Standard (12 - 15 Business Days)",
    price: 67.83,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 6.7
  },
  {
    title: "Premium White with Glossy Ink / Outside & Inside - Full Color / Standard (12 - 15 Business Days)",
    price: 71.82,
    option1: 'Premium White with Glossy Ink',
    option2: 'Outside & Inside - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 7.1
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Outside & Inside - Full Color / Standard (12 - 15 Business Days)",
    price: 59.85,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 5.9
  },

  {
    title: "Standard White with Matte Ink (HD Print) / No Printing (blank) / Standard (12 - 15 Business Days)",
    price: 31.92,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 3.1
  },
  {
    title: "Premium White with Satin Ink (HD Print) / No Printing (blank) / Standard (12 - 15 Business Days)",
    price: 39.90,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 3.9
  },
  {
    title: "Premium White with Glossy Ink / No Printing (blank) / Standard (12 - 15 Business Days)",
    price: 43.89,
    option1: 'Premium White with Glossy Ink',
    option2: 'No Printing (blank)',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 4.3
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / No Printing (blank) / Standard (12 - 15 Business Days)",
    price: 31.92,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Standard (12 - 15 Business Days)',
    area_price: 3.1
  },


  // Rush 
  {
    title: "Standard White with Matte Ink (HD Print) / Outside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 59.25,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 5.9
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Outside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 72.42,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 7.2
  },
  {
    title: "Premium White with Glossy Ink / Outside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 79.00,
    option1: 'Premium White with Glossy Ink',
    option2: 'Outside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 7.9
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Outside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 59.25,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'Outside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 5.8
  },

  {
    title: "Standard White with Matte Ink (HD Print) / Inside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 65.84,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 6.5
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Inside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 79.00,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 7.9
  },
  {
    title: "Premium White with Glossy Ink / Inside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 85.59,
    option1: 'Premium White with Glossy Ink',
    option2: 'Inside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 8.5
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Inside Only - Full Color / Rush (6 - 8 Business Days)",
    price: 65.84,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'Inside Only - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 6.5
  },

  {
    title: "Standard White with Matte Ink (HD Print) / Outside & Inside - Full Color / Rush (6 - 8 Business Days)",
    price: 98.75,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 9.8
  },
  {
    title: "Premium White with Satin Ink (HD Print) / Outside & Inside - Full Color / Rush (6 - 8 Business Days)",
    price: 111.92,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 11.5
  },
  {
    title: "Premium White with Glossy Ink / Outside & Inside - Full Color / Rush (6 - 8 Business Days)",
    price: 111.85,
    option1: 'Premium White with Glossy Ink',
    option2: 'Outside & Inside - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 11.5
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / Outside & Inside - Full Color / Rush (6 - 8 Business Days)",
    price: 98.75,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'Outside & Inside - Full Color',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 9.8
  },

  {
    title: "Standard White with Matte Ink (HD Print) / No Printing (blank) / Rush (6 - 8 Business Days)",
    price: 52.67,
    option1: 'Standard White with Matte Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 5.2
  },
  {
    title: "Premium White with Satin Ink (HD Print) / No Printing (blank) / Rush (6 - 8 Business Days)",
    price: 65.84,
    option1: 'Premium White with Satin Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 6.5
  },
  {
    title: "Premium White with Glossy Ink / No Printing (blank) / Rush (6 - 8 Business Days)",
    price: 72.42,
    option1: 'Premium White with Glossy Ink',
    option2: 'No Printing (blank)',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 7.2
  },
  {
    title: "Kraft (Brown) with Matte Ink (HD Print) / No Printing (blank) / Rush (6 - 8 Business Days)",
    price: 52.67,
    option1: 'Kraft (Brown) with Matte Ink (HD Print)',
    option2: 'No Printing (blank)',
    option3: 'Rush (6 - 8 Business Days)',
    area_price: 5.2
  }
];

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
