from node:24

workdir /app
copy ./package.json ./package-lock.json /app
run npm install
copy ./src/ /app/src/
cmd node ./src/index.js
