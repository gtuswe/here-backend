# Base Image
FROM alpine

# Installing nodejs
RUN apk add --update nodejs npm

# Create app directory
RUN mkdir /here

# Move to working directory
WORKDIR /here

# Make owner of the working directory to the user
COPY  ./ ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Move to the server
WORKDIR /here/src

# Start the server
CMD ["npm","start"]