const fs = require('fs');
const path = require('path');

test('File is created', () => {
    const filePath = path.join(__dirname, 'generateddata.txt');
    expect(fs.existsSync(filePath)).toBe(true);
});

test('File size is approximately 10MB', () => {
    const filePath = path.join(__dirname, 'generateddata.txt');
    const stats = fs.statSync(filePath);
    expect(stats.size).toBeGreaterThan(9.8 * 1024 * 1024);  // Allow some variation
    expect(stats.size).toBeLessThan(10.2 * 1024 * 1024);
});

test('File content format is correct', () => {
    const filePath = path.join(__dirname, 'generateddata.txt');
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(',');
    
    lines.forEach((line, index) => {
        if (index < lines.length - 1) {
            expect(line).toMatch(/^[\w\s.]+$/);
        }
    });
});
// Generate data and write to file - Ends