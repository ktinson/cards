FROM node:18-alpine
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]
# RUN npm run build
# RUN npm install -g serve
# EXPOSE 3001
# CMD [ "serve", "-s","build" ]