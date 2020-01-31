# logrouter
Routing logs from docker containers using GELF driver through UDP.

# About
This docker image provides a way to securely transfer all docker logs by UDP using GELF driver. All logs data might be encrypted and send to a remote log server for further analysis.

# Example usage

```yml
version: "3"

networks:
  net:

services:

  # loop-alpine generates logs each milisecond
  loop-alpine:
    image: alpine:latest
    container_name: log-generator
    command: /bin/sh -c "while true; do sleep 0.001; echo 'test message'; done;"
    logging:
      driver: gelf
      options:
        gelf-address: udp://localhost:22222 # specify proper port
        gelf-compression-type: none
        tag: test-loop
    depends_on: 
      - logrouter
    networks: 
      - net

  logrouter:
    image: logrouter
    container_name: logrouter
    volumes:
      - ./logrouter-data:/usr/src/app/data
    environment: 
      # all containers from compose file should write to this port
      - UDP_LISTEN_PORT=22222
      # port of remote log server
      - UDP_REMOTE_PORT=33333
      # hostname of remote log server
      - UDP_REMOTE_HOST=some.hostname.com.or.ip.address
      # max buffer file size - will be send to log server when is larger
      - ACTIVE_BUFFER_MAX_SIZE=1M # {number}k | {number}M
      # buffer will be send to log server after this time
      - ACTIVE_BUFFER_MAX_AGE=10  # time in seconds
      # data encryption may be enabled/disabled here
      - ENCRYPT_DATA=true
      # password used to encrypt data
      - ENCRYPT_PASSWORD=yourSuperSecretPassword
    ports: 
      # your ports
      - 22222:22222/udp
      - 33333:33333/udp
    networks: 
      - net
```


# MIT License

Copyright (c) 2020 lookasc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
