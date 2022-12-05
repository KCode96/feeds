FROM node:19.1.0-alpine3.16 

WORKDIR /app

COPY package*.json /app
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]