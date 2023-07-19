FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npx yarn install && npx yarn build

COPY . .

EXPOSE 4200

CMD [ "node", "dist/main.js" ]
