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


# Expose the port your app runs on (typically React apps use port 3000)
EXPOSE 1090

# Serve the build using a simple static server
CMD ["nodemon", "index.js"]
