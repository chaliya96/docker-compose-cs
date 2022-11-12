FROM node:latest
 
WORKDIR /imed

VOLUME ["/logs"]
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "IMED.js" ]