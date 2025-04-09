FROM node:20.11.1-alpine3.19

WORKDIR /home/app

COPY package.json .
# 300000ms => 5 phút
RUN npm install --timeout=300000 

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start"]