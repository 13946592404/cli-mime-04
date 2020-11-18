FROM nginx:1.15

# WORKDIR /usr/src/app

# COPY package.json .

RUN yarn build

# EXPOSE 8888

COPY dist/  /usr/share/nginx/html/

# CMD [ "npm", "start" ]

# COPY . .