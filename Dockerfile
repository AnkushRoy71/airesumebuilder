
FROM node:20.19.3-alpine3.21 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm ci
COPY . ./
RUN npm run build
CMD npm run start


FROM node:20.19.3-alpine3.21
WORKDIR /usr/app
COPY --from=build /app/src/dist/airesumebuilder/ ./
CMD node server/server.mjs

