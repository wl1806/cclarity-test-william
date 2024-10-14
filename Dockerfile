# pull official base image
FROM node:13.12.0-alpine

# set working directory
RUN mkdir /home/node/code
WORKDIR /home/node/code

ENV PORT=5005
ENV NODE_ENV=production
ENV APP_ENV=development

# add app
COPY ./.next ./.next
COPY ./server-dist ./server-dist
COPY ./node_modules_clean ./node_modules
COPY ./pages ./pages
COPY ./public ./public
COPY ./next.config.js ./next.config.js
COPY ./src/styles/antd-custom.less ./src/styles/antd-custom.less

EXPOSE $PORT
# start app
CMD node server-dist/index.js