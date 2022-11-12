FROM node:latest
 
WORKDIR /orig
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "ORIG.js" ]