import express from "express";
import db from "../db.js"; // Adjust as needed
import ExcelJS from "exceljs";

const router = express.Router();

router.get("/excel", async (req, res) => {
  try {
    const { campus, sportType } = req.query;

    // Build the base SQL query
    let query = "SELECT * FROM players";
    let queryParams = [];

    // Add filters only if values are provided
    if (campus) {
      query += " WHERE campus = ?";
      queryParams.push(campus);
    }

    if (sportType) {
      query += campus ? " AND sporttypes = ?" : " WHERE sporttypes = ?";
      queryParams.push(sportType);
    }

    // Fetch data from the database with or without filters
    const [rows] = await db.query(query, queryParams);

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Players");

    // Add columns to the worksheet
    worksheet.columns = [
      { header: "คำนำหน้า", key: "title", width: 10 },
      { header: "ชื่อ", key: "fname", width: 20 },
      { header: "นามสกุล", key: "lname", width: 20 },
      { header: "วิทยาเขต", key: "campus", width: 20 },
      { header: "ประเภทกีฬา", key: "sporttypes", width: 20 },
    ];

    // Add rows to the worksheet
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Set response headers to indicate a file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=players.xlsx");

    // Send the Excel file as a response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error exporting players to Excel:", err);
    res
      .status(500)
      .json({ message: "Error exporting players", error: err.message });
  }
});

router.get("/excelcoach", async (req, res) => {
  try {
    const { campus, sportType } = req.query;

    // Build the base SQL query
    let query = "SELECT * FROM coach";
    let queryParams = [];

    // Add filters only if values are provided
    if (campus) {
      query += " WHERE campus = ?";
      queryParams.push(campus);
    }

    if (sportType) {
      query += campus ? " AND sporttypes = ?" : " WHERE sporttypes = ?";
      queryParams.push(sportType);
    }

    // Fetch data from the database with or without filters
    const [rows] = await db.query(query, queryParams);

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Coaches");

    // Add columns to the worksheet
    worksheet.columns = [
      { header: "คำนำหน้า", key: "title", width: 10 },
      { header: "ชื่อ", key: "coach_fname", width: 20 },
      { header: "นามสกุล", key: "coach_lname", width: 20 },
      { header: "วิทยาเขต", key: "campus", width: 20 },
      { header: "ประเภทกีฬา", key: "sporttypes", width: 20 },
    ];

    // Add rows to the worksheet
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Set response headers to indicate a file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=coaches.xlsx");

    // Send the Excel file as a response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error exporting coaches to Excel:", err);
    res
      .status(500)
      .json({ message: "Error exporting coaches", error: err.message });
  }
});

export default router;
