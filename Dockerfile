FROM node:16

WORKDIR /usr/yousheet

COPY . .

EXPOSE 5000

RUN npm i
RUN npx prisma generate

CMD ["npx", "ts-node", "server.ts"]