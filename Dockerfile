# Use the official Node.js image with Alpine Linux
ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine

# Set the environment to production
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (use npm ci for a clean install in production)
RUN npm ci 

# Copy the rest of the source files into the container
COPY . .

# RUN npm install tsc -g
# Compile TypeScript files to JavaScript
RUN npm run build

# Remove dev dependencies after compilation
RUN npm ci --omit=dev && npm cache clean --force

# Ensure the node user has permission to access the files
RUN chown -R node:node /usr/src/app

# Switch to the non-root node user
USER node

# Expose the application port (default for CAP is 4004)
EXPOSE 4004


# Run the application
CMD ["npm", "start"]