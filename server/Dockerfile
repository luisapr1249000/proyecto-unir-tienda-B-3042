FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]