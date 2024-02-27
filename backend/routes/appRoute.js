const express = require("express");
const appRoute = express.Router();
const LaundryRequest = require("../model/appModel");
const { laundryPrice } = require("../model/resetPasswordModel");

// get laundry requests
appRoute.get("/price", async (req, res) => {
  try {
    let data = await laundryPrice.find();
    res.status(200).json({ data:data[0] });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
appRoute.post("/set-price", async (req, res) => {
  try {
    let data = new laundryPrice(req.body);
    await data.save();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

appRoute.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await LaundryRequest.find({ userId: id }).sort({ _id: -1 });
    if (!data) {
      return res.json({ message: "Not request found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

appRoute.post("/create-request", async (req, res) => {
  try {
    let newRequest = new LaundryRequest(req.body);
    await newRequest.save();
    res.status(200).json({
      message: "Laundry request created successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// confirming request by request id
appRoute.put("/confirm-request/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the laundry request by ID
    const laundryRequest = await LaundryRequest.findById({ _id: id });

    if (!laundryRequest) {
      return res.status(404).json({ error: "Laundry request not found" });
    }

    // Update the status to confirmed
    laundryRequest.status = "confirmed";
    await laundryRequest.save();

    res.status(200).json({
      message: "Laundry request confirmed successfully",
      data: laundryRequest,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

appRoute.put("/update", async (req, res) => {
  try {
    const { id } = req.body;
    let laundryReq = await LaundryRequest.findOne({ _id: id });

    if (!laundryReq) {
      return res.status(404).json({ error: "Laundry request not found" });
    }
    laundryReq = req.body;
    await LaundryRequest.findByIdAndUpdate(id,laundryReq, { upsert: true });
    res
      .status(200)
      .json({ message: "Updated successfully", data: laundryReq });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
});

appRoute.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the request ID from the URL parameter
    const { status } = req.body; // Extract the new status from the request body

    // Find the laundry request by ID
    let laundryReq = await LaundryRequest.findOne({ _id: id });

    if (!laundryReq) {
      return res.status(404).json({ error: "Laundry request not found" });
    }

    // Update the status of the laundry request
    laundryReq.status = status; // Assuming 'status' is a field in your schema

    // Save the updated laundry request
    await laundryReq.save();

    res.status(200).json({ message: "Request status updated successfully", data: laundryReq });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});


appRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingLaundryReq = await LaundryRequest.findOne({ _id: id });

    if (!existingLaundryReq) {
      return res.status(404).json({ error: "Laundry Request not found" });
    }
    await LaundryRequest.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Deleted successfully", data: existingLaundryReq });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
});

module.exports = appRoute;
