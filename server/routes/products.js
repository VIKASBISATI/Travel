const express = require("express");
const router = express.Router();
const { Products } = require("../models/Products");
const multer = require("multer");
const { auth } = require("../middleware/auth");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only png and jpg are allowed"), false);
    }
    cb(null, true);
  }
});
var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  const product = new Products(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  const term = req.body.searchTerm;
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
        req.body.filters[key][0];
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  if (term) {
    Products.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productData: products,
          postSize: products.length,
          checkedContinents: findArgs
        });
      });
  } else {
    Products.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productData: products,
          postSize: products.length,
          checkedContinents: findArgs
        });
      });
  }
});
router.get("/products_by_id", (req, res) => {
  console.log("prodcut",req.query.id)
  let type = req.query.type;
  let productIds = req.query.id;
  if (type === "array") {
      let ids = req.query.id.split(",");
      productIds = [];
      productIds = ids.map((id)=>{
        return id;
      })
  }
  Products.find({ '_id': { $in: productIds } })
  .populate("writer")
  .exec((err,product)=>{
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
  });
});

module.exports = router;
