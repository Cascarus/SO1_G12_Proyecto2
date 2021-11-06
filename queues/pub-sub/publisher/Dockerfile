FROM golang:latest

WORKDIR /usr/src/goApp

COPY . ./

COPY ./PK/PS_key.json /usr/PK/PS_key.json

RUN apt-get update

RUN go mod download

EXPOSE 8080

CMD ["go", "run", "main.go"]