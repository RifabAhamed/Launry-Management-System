const mongoose = require("mongoose");

const appSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, require: true },
    status: {
      type: String,
      enum: ["In Process", "Completed"],
      default: "In Process",
    },
    pickupDate: { type: String, require: true },
    serviceType: { type: String,enum: ["Fast", "Regular"], default: "Regular" },
    topwears: { type: String, default: "NO" },
    bottomwears: { type: String, default: "NO" },
    woolenCloths: { type: String, default: "NO" },
    contactNumber: { type: String },
    others: { type: String, default: "NO",require: true },
    description: { type: String, default: "NO" },
  },
  {
    versionKey: false,
  }
);

const LaundryRequest = mongoose.model("app", appSchema);

module.exports = LaundryRequest;
