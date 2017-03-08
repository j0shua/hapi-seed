FROM node:4-slim

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install && npm cache clean


ENV PORT 9999

EXPOSE 9999

CMD ["npm", "run", "start"]

