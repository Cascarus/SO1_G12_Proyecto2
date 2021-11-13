FROM node:14

WORKDIR /user/src/app

COPY . .

RUN npm install

RUN npm i nodemon -g

CMD ["nodemon", "index.js"]