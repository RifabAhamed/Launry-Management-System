const express = require("express");
const employeeRoute = express.Router();
const employeeCollection = require("../model/employeeModel");

employeeRoute.get("/", async (req, res) => {
  
  let data = await employeeCollection.find();
  res.send(data);
});

employeeRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  let data = await employeeCollection.findOne({ _id: id });
  res.send(data);
});

employeeRoute.post("/create", async (req, res) => {
  try {
    const { nic } = req.body;
    const existingEmployee = await employeeCollection.findOne({ nic });
    if (existingEmployee) {
      return res.status(400).json({ error: "Nic already exists" });
    }
    const newEmployee = new employeeCollection(req.body);
    await newEmployee.save();
    res.status(200).json({ message: "Employee registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
});


employeeRoute.put("/update", async (req, res) => {
    try {
      const { id } = req.body;
      let existingEmployee = await employeeCollection.findOne({ _id: id });
  
      if (!existingEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      existingEmployee = req.body;
      await employeeCollection.findByIdAndUpdate(id,existingEmployee, { upsert: true });
      res
        .status(200)
        .json({ message: "Updated successfully", data: existingEmployee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error", error });
    }
  });

  employeeRoute.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const existingEmployee = await employeeCollection.findOne({ _id: id });
  
      if (!existingEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      await employeeCollection.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: "Deleted successfully", data: existingEmployee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error", error });
    }
  });


module.exports = employeeRoute;
