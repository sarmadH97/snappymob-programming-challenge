const fs = require("fs").promises;
const path = require("path");
const readAndPrintObjects = require("./processData"); // Import your function

describe("Challenge B - File Reading & Classification", () => {
  test("Should classify objects correctly", async () => {
    const filePath = path.join(__dirname, "generateddata.txt");

    // Read file content before testing
    const data = await fs.readFile(filePath, "utf8");
    
    // Call the function (assuming it processes and returns results)
    const output = await readAndPrintObjects(filePath); 

    expect(output).toContain("Type: Integer");
    expect(output).toContain("Type: Real Number");
    expect(output).toContain("Type: Alphabetical String");
    expect(output).toContain("Type: Alphanumeric");
  });
});
