const express = require("express");
const CajaService = require("../services/servicesCaja");
const route = express.Router();

const cajaService = new CajaService();

// Ruta GET para obtener todas las cajas
route.get("/", async (req, res) => {
  try {
    const cajas = await cajaService.getAllCajas();
    res.json(cajas);
  } catch (error) {
    console.error("Error fetching cajas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener una caja por id_caja
route.get("/:id_caja", async (req, res) => {
  try {
    const { id_caja } = req.params;
    const caja = await cajaService.getCaja(id_caja);
    res.json(caja);
  } catch (error) {
    console.error("Error fetching caja:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear una nueva caja
route.post("/", async (req, res) => {
  try {
    const newCaja = await cajaService.createCaja(req.body);
    res.status(201).json(newCaja);
  } catch (error) {
    console.error("Error creating caja:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar una caja por id_caja
route.put("/:id_caja", async (req, res) => {
  try {
    const { id_caja } = req.params;
    const updatedCaja = await cajaService.updateCaja(id_caja, req.body);
    res.json(updatedCaja);
  } catch (error) {
    console.error("Error updating caja:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar una caja por id_caja
route.delete("/:id_caja", async (req, res) => {
  try {
    const { id_caja } = req.params;
    const message = await cajaService.deleteCaja(id_caja);
    res.json(message);
  } catch (error) {
    console.error("Error deleting caja:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
