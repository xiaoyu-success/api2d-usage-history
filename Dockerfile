FROM --platform=$TARGETPLATFORM node:18-alpine3.15
EXPOSE 9000

ENV TOKEN=""
ENV PORT=""

RUN mkdir -p /data/api
COPY index.js /data/api/index.js
COPY package.json /data/api/package.json
RUN npm install --prefix /data/api
CMD ["node", "/data/api/index.js"]
