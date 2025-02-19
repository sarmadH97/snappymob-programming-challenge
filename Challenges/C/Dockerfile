# Use an official Node.js image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (if present)
COPY package*.json ./

# Install dependencies
#RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure the /data directory exists (for input and output)
RUN mkdir -p /data

# Set the input and output file paths as environment variables
ENV INPUT_FILE=/data/generateddata.txt
ENV OUTPUT_FILE=/data/processeddata.txt

# Run the script when the container starts
CMD ["node", "processData-docker.js"]
