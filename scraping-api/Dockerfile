# Step 1: Build the application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Create the production image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Install production dependencies only
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --only=production

# Copy the build output from the previous step
COPY --from=build /app/dist /app/dist

# Expose the port the app will run on
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]
