FROM node:12-alpine
RUN npm install
WORKDIR /app
COPY . .
RUN development
CMD ["node", "src/index.js"]