FROM node:8-alpine

WORKDIR /opt/nodejs/app

ENV NODE_ENV dev
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

COPY . .

#Set proxy
RUN npm config set proxy http://pxy12:8080 && npm config set https-proxy http://pxy12:8080

EXPOSE 3000

CMD ["npm","start" ]
