FROM alpine:latest as builder

RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add --update nodejs npm yarn

WORKDIR /usr/app

COPY . .

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN yarn

RUN yarn build

# -------- Second Stage --------- #

FROM alpine:latest

LABEL maintainer="devops@cbidigital.com"

RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add --update nodejs npm

RUN npm i -g pm2 knex

WORKDIR /usr/app/dist

COPY --from=builder /usr/app/dist .
COPY --from=builder /usr/app/package.json .
COPY --from=builder /usr/app/yarn.lock .
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/certs ./certs/
COPY --from=builder /usr/app/migrations ./migrations/
COPY --from=builder /usr/app/docker/pm2/processes.json .
COPY --from=builder /usr/app/knexfile.js .

EXPOSE 3000

CMD [ "pm2","start","--no-daemon","processes.json","--env","production" ]