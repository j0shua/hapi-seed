FROM node:8-slim

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install && npm cache verify

ENV PORT 8888

EXPOSE 8888

CMD ["npm", "run", "start"]

