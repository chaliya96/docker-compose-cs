FROM node:latest
 
WORKDIR /httpserve

VOLUME ["/logs"]
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "HTTPSERVE.js" ]