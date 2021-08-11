FROM node:16-alpine AS development
WORKDIR /app-huerta
COPY . .

RUN npm install

ENV NODE_ENV=dev
EXPOSE 3000
CMD ["node", "src/index.js"]







