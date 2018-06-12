FROM node:9-alpine

RUN npm install --global yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

ENV NODE_ENV=production

EXPOSE 3001
CMD yarn start