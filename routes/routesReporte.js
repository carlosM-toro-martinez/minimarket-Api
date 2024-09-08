// routes/reporteRoutes.js
const express = require("express");
const ReporteService = require("../services/servicesReporte");
const route = express.Router();

const reporteService = new ReporteService();

// Ruta GET para obtener todos los reportes
route.get("/", async (req, res) => {
  try {
    const reportes = await reporteService.getAllReportes();
    res.json(reportes);
  } catch (error) {
    console.error("Error fetching reportes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta GET para obtener un reporte por id_reporte
route.get("/:id_reporte", async (req, res) => {
  try {
    const { id_reporte } = req.params;
    const reporte = await reporteService.getReporte(id_reporte);
    res.json(reporte);
  } catch (error) {
    console.error("Error fetching reporte:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta POST para crear un nuevo reporte
route.post("/", async (req, res) => {
  try {
    const newReporte = await reporteService.createReporte(req.body);
    res.status(201).json(newReporte);
  } catch (error) {
    console.error("Error creating reporte:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta PUT para actualizar un reporte por id_reporte
route.put("/:id_reporte", async (req, res) => {
  try {
    const { id_reporte } = req.params;
    const updatedReporte = await reporteService.updateReporte(
      id_reporte,
      req.body
    );
    res.json(updatedReporte);
  } catch (error) {
    console.error("Error updating reporte:", error);
    res.status(404).json({ error: error.message });
  }
});

// Ruta DELETE para eliminar un reporte por id_reporte
route.delete("/:id_reporte", async (req, res) => {
  try {
    const { id_reporte } = req.params;
    const message = await reporteService.deleteReporte(id_reporte);
    res.json(message);
  } catch (error) {
    console.error("Error deleting reporte:", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = route;
