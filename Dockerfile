FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN cp config.example.ts config.ts

EXPOSE 3000

CMD ["yarn", "dev"]