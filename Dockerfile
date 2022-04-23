## STAGE 1 (Production Base)
# Get prod deps. installed.
FROM node:17-alpine3.14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm ci --production \
    && npm cache clean --force

COPY . . 

RUN npm run build

EXPOSE 3000

CMD [ "node", "run", "start" ]
