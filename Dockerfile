FROM node:14-alpine

WORKDIR /app
COPY . /app

ARG DB_HOST=localhost
ARG DB_PORT=3306
ARG DB_NAME=health_checker
ARG DB_USER=root
ARG DB_PASSWORD=password
ARG DB_SYNC=false

ARG URL=http://localhost
ARG SLACK_WEBHOOK_URL=http://slack.com

ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_SYNC=${DB_SYNC}

ENV URL=${URL}
ENV SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}

ENV HOST 0.0.0.0

EXPOSE 3000

RUN npm install && npm run test && npm run build

ENTRYPOINT ["npm", "run", "start"]
