FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm","run" ,"start:migrate:prod"]

EXPOSE 3000
