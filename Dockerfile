FROM node:latest as node
WORKDIR /app
COPY package.json /app
RUN npm insstall --silent
COPY . .
EXPOSE 4200
RUN npm run build
CMD [ "node", "index.html" ]
