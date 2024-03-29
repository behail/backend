# Use an official Node runtime as the base image
FROM node:21

# Set the working directory in the container to /
WORKDIR /

# Copy package.json and package-lock.json to /
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "index.js"]
