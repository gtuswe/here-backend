# Base image
FROM node:16

# Create app directory
RUN mkdir /here && chown -R node:node /here

# Move to working directory
WORKDIR /here

# Create an user
USER node

# Make owner of the working directory to the user
COPY --chown=node:node ./ ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Move to the server
WORKDIR /here

# Start the server
CMD ["npm","start"]