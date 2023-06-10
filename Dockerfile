FROM node:18-alpine3.15

ENV TOKEN=""
ENV PORT=""

EXPOSE 9000

RUN mkdir -p /app
COPY index.js /app/index.js
COPY package.json /app/package.json
RUN npm install --prefix /app
CMD ["node", "/app/index.js"]
