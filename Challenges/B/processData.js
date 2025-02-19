const fs=require('fs');
const path=require('path');

function determineType(value) {
    const trimmedValue = value.trim();
    
    if (/^\d+$/.test(trimmedValue)) {
        return 'Integer';
    }
    if (/^\d+\.\d+$/.test(trimmedValue)) {
        return 'Real Number';
    }
    if (/^[a-zA-Z]+$/.test(trimmedValue)) {
        return 'Alphabetical String';
    }
    return 'Alphanumeric'; 
}


function processFile() {
    const filePath = path.join(__dirname, 'generateddata.txt');
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    
    let buffer = '';
    
    readStream.on('data', (chunk) => {
        buffer += chunk;
        const objects = buffer.split(',');

        for (let i = 0; i < objects.length - 1; i++) {
            const obj = objects[i];
            const type = determineType(obj);
            console.log(`Type: ${type}, Value: "${obj.trim()}"`);
        }
        
        buffer = objects[objects.length - 1];
    });
    
    readStream.on('end', () => {
        if (buffer) {
            const type = determineType(buffer);
            console.log(`Type: ${type}, Value: "${buffer.trim()}"`);
        }
        console.log('File processing completed.');
    });
    
    readStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
}

processFile();
