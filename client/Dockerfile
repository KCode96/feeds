FROM node:19.1.0-alpine3.16 

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]


