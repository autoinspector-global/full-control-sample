require("isomorphic-form-data");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
const Autoinspector = require("autoinspector").default;
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  },
});

const upload = multer({ storage });

dotenv.config({
  path: ".env",
});

// Start express application
const app = express();

// Extract the sensitive values from .env
const apikey = process.env.AUTOINSPECTOR_API_KEY;

// Instantiate the Autoinspector SDK passing the credentials.
const autoinspector = new Autoinspector({
  apikey,
});

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FULL_CONTROL_CLIENT_ORIGIN
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.post("/webhook", (req, res) => {
  switch (req.body.event) {
    case "image_processed":
      // When a image was processed, you will receive this event
      break;

    case "inspection_completed":
      // When a inspection was finished and all photos attached to it was processed, you will receive this event
      break;

    default:
      // another events like inspection_started, inspection_blocked
      break;
  }

  return res.status(200).json({ message: "webhook received." });
});

app.post("/inspection/finish/:inspectionId", async (req, res) => {
  try {
    const finishedMessage = await autoinspector.inspections.finishInspection({
      inspectionId: req.params.inspectionId,
    });
    return res.status(200).json(finishedMessage);
  } catch (err) {
    return res.status(503).json({ message: "autoinspector is not available." });
  }
});

app.post(
  "/inspection/image/:productId",
  upload.single("image"),
  async (req, res) => {
    const filename = path.join(__dirname, "./uploads/", req.file.filename);

    try {
      const imageSaved = await autoinspector.inspections.vehicle.uploadImage({
        image: fs.createReadStream(filename),
        productId: req.params.productId,
        side: req.body.side,
      });

      return res.status(201).json(imageSaved);
    } catch (err) {
      console.log("something went wrong.", err);
      return res
        .status(503)
        .json({ message: "autoinspector is not available." });
    }
  }
);

app.post("/inspection", async (req, res) => {
  try {
    const inspection = await autoinspector.inspections.vehicle.create({
      consumer: req.body.consumer,
      vehicle: {
        // the unique required key here is the type.
        ...req.body.vehicle,
        configuration: {
          color: {
            required: false,
            run: false,
          },
          use: {
            required: false,
            run: false,
          },
        },
      },
      producer: {
        internalId: "123",
      },
      mode: "full_control",
    });

    return res.status(200).send(inspection);
  } catch (err) {
    console.log("something went wrong.", err);
    return res.status(503).json({ message: "autoinspector is not available." });
  }
});

app.get("/inspection", async (req, res) => {
  try {
    const inspections = await autoinspector.inspections.listInspections();
    return inspections;
  } catch (err) {
    return res.status(503).json({ message: "autoinspector is not available." });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
