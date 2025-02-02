FROM node:20-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./local/types/passport/index.d.ts /app/node_modules/@types/passport/index.d.ts

COPY src ./src

RUN npm run build

EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]

