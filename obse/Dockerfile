FROM node:latest
 
WORKDIR /obse

VOLUME ["/logs"]
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "OBSE.js" ]