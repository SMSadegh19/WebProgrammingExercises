FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "api.js"]



FROM golang:1.16-alpine
WORKDIR /usr/src/goapp
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /docker-go-sha
EXPOSE 8080
CMD [ "/docker-go-sha" ]

