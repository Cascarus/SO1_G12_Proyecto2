FROM golang:latest

WORKDIR /usr/src/goApp

COPY . ./

RUN apt-get update

RUN go mod download

EXPOSE 8090

CMD ["go", "run", "main.go"]