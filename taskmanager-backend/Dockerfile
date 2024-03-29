FROM node:21

WORKDIR /urs/src/app

ENV NODE_ENV=development

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]