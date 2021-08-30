FROM node:12.14.1 as build

RUN npm i -g nodemon

WORKDIR /opt/app

COPY build /opt/app/build

COPY node_modules /opt/app/node_modules

COPY entrypoint.sh /bin/entrypoint.sh

RUN chmod +x /bin/entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]