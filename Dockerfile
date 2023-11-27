FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

COPY .env ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 3000

EXPOSE 3000


CMD [ "npm", "start" ]