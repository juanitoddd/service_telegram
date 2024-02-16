FROM alpine
RUN apk add --update nodejs npm bash
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN echo 'alias service="echo TELEGRAM"' >> ~/.bashrc
CMD ["npm", "start"]