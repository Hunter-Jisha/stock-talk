FROM node:16.15
WORKDIR /app
COPY . .
COPY ./package.json ./package.json
RUN npm run build
EXPOSE 8000
ENV PORT 8000
CMD node out/index.js