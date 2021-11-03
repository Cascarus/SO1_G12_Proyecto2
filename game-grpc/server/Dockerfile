FROM golang:latest
WORKDIR /app/src
COPY . .
EXPOSE 50051
CMD [ "go" , "run", "grpc-server.go" ]