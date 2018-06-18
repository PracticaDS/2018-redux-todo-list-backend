FROM node:9-alpine

# this makes the build fail in travis (with permission denied to run yarn)
# RUN npm install --global yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . . 

ENV NODE_ENV=production

EXPOSE 3001
CMD yarn start-prod