FROM node:latest
 
WORKDIR /service-02
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "service02.js" ]

EXPOSE 8002