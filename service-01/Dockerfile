FROM node:latest
 
WORKDIR /service-01
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "service01.js" ]

