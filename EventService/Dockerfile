# Use the Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on (replace 4000 with your backend port)
EXPOSE 8082

# Command to start your app
CMD ["nodemon", "index.js"]
