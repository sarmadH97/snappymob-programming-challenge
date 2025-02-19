const fs = require("fs");
const path = require("path");

// Use environment variables for file paths
const inputFilePath = process.env.INPUT_FILE || path.join(__dirname, "generateddata.txt");
const outputFilePath = process.env.OUTPUT_FILE || path.join(__dirname, "processeddata.txt");

// Read and process the file
fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const classifyType = (value) => {
        const trimmedValue = value.trim();
        if (/^[A-Za-z]+$/.test(trimmedValue)) return "Alphabetical String";
        if (/^\d+$/.test(trimmedValue)) return "Integer";
        if (/^\d+\.\d+$/.test(trimmedValue)) return "Real Number";
        return "Alphanumeric";
    };

    const results = data.split(",").map(value => `Value: "${value.trim()}", Type: ${classifyType(value)}`).join("\n");

    // Write results to output file
    fs.writeFile(outputFilePath, results, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Processing complete. Output saved to:", outputFilePath);
        }
    });
});
