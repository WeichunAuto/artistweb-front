FROM node:22.9.0

WORKDIR /ArtistWeb

COPY package*.json .

RUN npm install & npm install axios

COPY . .

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
