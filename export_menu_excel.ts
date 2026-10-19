import { menuData } from "./src/data/menu";
import * as fs from "fs";
import * as path from "path";

async function generateExcelAndCsv() {
  let itemIndex = 1;
  const rows: Array<{
    "S.No": number;
    "Category": string;
    "Item Name": string;
    "Price (Rs)": number;
    "Original Price (Rs)": number | string;
    "Diet": string;
    "Availability Type": string;
    "Meal Periods": string;
    "Timing": string;
    "Image File Path": string;
    "Badges": string;
    "Item ID": string;
  }> = [];

  for (const category of menuData) {
    for (const item of category.items) {
      const mealPeriodsFormatted = (item.mealPeriods || [])
        .map((m) => {
          switch (m) {
            case "BREAKFAST":
              return "Breakfast";
            case "LUNCH":
              return "Lunch";
            case "EVENING_SNACKS":
              return "Evening Snacks";
            case "DINNER":
              return "Dinner";
            case "ALL_DAY":
              return "All Day";
            default:
              return m;
          }
        })
        .join(", ");

      const badgesFormatted = (item.badges || [])
        .map((b: string) => {
          switch (b) {
            case "chef-choice":
            case "chef-special":
              return "Chef's Special";
            case "bestseller":
              return "Best Seller";
            case "veg":
              return "Pure Veg";
            case "spicy":
              return "Spicy";
            case "new":
              return "New";
            default:
              return b;
          }
        })
        .join(", ");

      let timingStr = "All Day / Meal Timings";
      if (item.startTime && item.endTime) {
        timingStr = `${item.startTime} - ${item.endTime}`;
      } else if (category.startTime && category.endTime) {
        timingStr = `${category.startTime} - ${category.endTime}`;
      }

      rows.push({
        "S.No": itemIndex++,
        "Category": category.name,
        "Item Name": item.name,
        "Price (Rs)": item.price,
        "Original Price (Rs)": item.originalPrice || "-",
        "Diet": item.isVeg ? "Pure Veg (100%)" : "Non-Veg",
        "Availability Type": item.availabilityType || category.availabilityType || "ALWAYS",
        "Meal Periods": mealPeriodsFormatted,
        "Timing": timingStr,
        "Image File Path": item.image || "-",
        "Badges": badgesFormatted || "Pure Veg",
        "Item ID": item.id,
      });
    }
  }

  console.log(`Extracted ${rows.length} items across ${menuData.length} categories.`);

  // 1. Generate CSV with UTF-8 BOM so Excel opens Tamil / Special characters flawlessly
  const csvHeaders = Object.keys(rows[0]);
  const csvLines = [
    csvHeaders.map((h) => `"${h}"`).join(","),
    ...rows.map((row) =>
      csvHeaders
        .map((h) => {
          const val = (row as any)[h];
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];

  const csvContent = "\uFEFF" + csvLines.join("\r\n");
  const csvFilePath = path.join(process.cwd(), "Hotel_Apoorvaa_306_Menu_Items.csv");
  fs.writeFileSync(csvFilePath, csvContent, "utf8");
  console.log(`Saved CSV file: ${csvFilePath}`);

  // 2. Generate XLSX using xlsx library
  try {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Auto-fit column widths
    const colWidths = csvHeaders.map((h) => {
      let maxLen = h.length;
      for (const row of rows) {
        const val = String((row as any)[h] || "");
        if (val.length > maxLen) maxLen = val.length;
      }
      return { wch: Math.min(Math.max(maxLen + 3, 10), 45) };
    });
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Menu Items (306)");

    const xlsxFilePath = path.join(process.cwd(), "Hotel_Apoorvaa_306_Menu_Items.xlsx");
    XLSX.writeFile(workbook, xlsxFilePath);
    console.log(`Saved XLSX file: ${xlsxFilePath}`);
  } catch (err) {
    console.warn("XLSX package not installed locally, installing or running via npx...");
  }
}

generateExcelAndCsv();
