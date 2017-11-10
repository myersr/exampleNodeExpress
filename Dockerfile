FROM node:6-alpine
MAINTAINER Roy Myers <roy.myers@optum.com>
LABEL multi.version = "1.0.0" \
      multi.description = "Very basic example Node.js express application. Great for testing and quick deployment of services." \
      multi.contact1 = "roy.myers@optum.com" \
      multi.contact2 = "myersrdev@gmail.com"

COPY . /expApp
WORKDIR /expApp

RUN npm install --produciton

EXPOSE 8181
CMD ["npm", "start"]
