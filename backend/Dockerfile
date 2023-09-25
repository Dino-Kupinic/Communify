ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD ["npm", "run", "dev"]
