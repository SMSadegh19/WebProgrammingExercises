FROM golang:alpine
WORKDIR /usr/src/goapp
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN go build -o /docker-go-sha
EXPOSE 8080
CMD [ "/docker-go-sha" ]