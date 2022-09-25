FROM node:16.15
WORKDIR /app
COPY . .
COPY ./package.json ./package.json
RUN npm i
EXPOSE 8000
ENV PORT 8000
CMD VITE_API_URL=$VITE_API_URL npm run build; node out/index.js