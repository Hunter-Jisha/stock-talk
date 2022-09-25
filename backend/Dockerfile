FROM node:18
WORKDIR /app
COPY . .
RUN rm -rf node_modiles
RUN rm -f package-lock.json
RUN npm i
EXPOSE 8000
CMD npx prisma migrate dev; npm start