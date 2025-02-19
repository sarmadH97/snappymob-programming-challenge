const fs = require('fs');
const path = require('path');

// Random data generators - Starts
const randomIntegers = (min = 1, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomRealNumbers = (min = 1, max = 1000) => {
    return (Math.random() * (max - min) + min).toFixed(3);
}

const randomAlphabets = (length = 5) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

const randomAlphanumerics = (length = 5) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
    let addedSpace = " ".repeat(Math.floor(Math.random() * 10));
    return addedSpace + result + addedSpace;
}

const generateData = () => {
    const allRandomObjects = [randomAlphabets, randomRealNumbers, randomAlphanumerics, randomIntegers];
    const randomGenerator = allRandomObjects[Math.floor(Math.random() * allRandomObjects.length)];
    return randomGenerator();
}
// Random data generators - Ends

// Generate data and write to file - Starts
const filePath = path.join(__dirname, 'generateddata.txt');
const writeDataToFile = fs.createWriteStream(filePath);
const targetSize = 1024 * 1024 * 10; // 10MB
let currentSize = 0;

console.log("Generating 10MB of random data...");

const writeData = () => {
    while (currentSize < targetSize) {
        const data = generateData() + ",";
        const dataSize = Buffer.byteLength(data, 'utf8');

        if (currentSize + dataSize > targetSize) {
            writeDataToFile.end();
            console.log(`File generated successfully: ${filePath}`);
            return;
        }

        if (!writeDataToFile.write(data)) {
            writeDataToFile.once("drain", writeData);
            return;
        }

        currentSize += dataSize;
    }

    writeDataToFile.end();
    console.log(`File generated successfully: ${filePath}`);
}

writeData();
// Generate data and write to file - Ends
