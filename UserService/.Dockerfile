# Use the Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on (replace 4000 with your backend port)
EXPOSE 8081

# Command to start your app
CMD ["node", "index.js"]
