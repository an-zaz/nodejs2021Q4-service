# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- **Your Node vershon should be >= 16.0.0**
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)

## Downloading

```
git clone git@github.com:an-zaz/nodejs2021Q4-service.git
```

Switch to the task branch:
```
git checkout task10-NestJs
```

Switch to the app folder.

```
cd .\nodejs2021Q4-service\
```


## Installing NPM modules

```
npm install
```

### Run Docker Container
To run docker container switch to task8-postgreSQL-Typeorm branch and run:
```
docker-compose up
```
**If the nodeJs container is down, please change something in src/app.ts file to make it reload.  (for example add some enters)** 

### Run Migrations

```
npm run typeorm
```

## Testing

```
npm test:auth
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

Nest is [MIT licensed](LICENSE).

### Coparison of Fastify vs Express usage
[K6](https://k6.io/) was used as load testing tool 
Running a 50-second, 100-Virtual Users load test
# Express
|                          |                                                                                    |
|--------------------------|------------------------------------------------------------------------------------|
| data_received            | 49 MB  962 kB/s                                                                    |
| data_sent                | 491 kB 9.6 kB/s                                                                    |
| http_req_blocked         | avg=13.18ms  min=0s       med=0s       max=2.47s    p(90)=0s       p(95)=0s        |
| http_req_connecting      | avg=4.71ms   min=0s       med=0s       max=1.15s    p(90)=0s       p(95)=0s        |
| http_req_duration        | avg=158.91ms min=129.58ms med=152.24ms max=1.08s    p(90)=166.09ms p(95)=178.65ms  |
|{ expected_response:true }| avg=158.91ms min=129.58ms med=152.24ms max=1.08s    p(90)=166.09ms p(95)=178.65ms  |
| http_req_failed          | 0.00% ✓ 0        ✗ 4290                                                           |
| http_req_receiving       | avg=3.21ms   min=0s       med=0s       max=322.85ms p(90)=974.44µs p(95)=1.13ms    |
| http_req_sending         | avg=21.25µs  min=0s       med=0s       max=1.19ms   p(90)=0s       p(95)=99.7µs    |
| http_req_tls_handshaking | avg=7.48ms   min=0s       med=0s       max=1.27s    p(90)=0s       p(95)=0s        |
| http_req_waiting         | avg=155.68ms min=129.14ms med=151.76ms max=1.08s    p(90)=164.26ms p(95)=169.96ms  |
| http_reqs                | 4290   83.87793/s                                                                  |
| iteration_duration       | avg=1.17s    min=1.13s    med=1.15s    max=3.92s    p(90)=1.17s    p(95)=1.29s     |
| iterations               |  4290   83.87793/s                                                                 |
| vus                      |  8      min=8      max=100                                                         |
| vus_max                  |  100    min=100    max=100                                                         |

# Fastify
|                          |                                                                                    |
|--------------------------|------------------------------------------------------------------------------------|
| data_received            | 49 MB  964 kB/s                                                                    |
| data_sent                | 492 kB 9.6 kB/s                                                                    |
| http_req_blocked         | avg=12.77ms  min=0s       med=0s       max=612.67ms p(90)=0s       p(95)=0s        |
| http_req_connecting      | avg=5.66ms   min=0s       med=0s       max=156.21ms p(90)=0s       p(95)=0s        |
| http_req_duration        | avg=157.86ms min=129.05ms med=149.01ms max=742.76ms p(90)=164.28ms p(95)=271.84ms  |
|{ expected_response:true }| avg=157.86ms min=129.05ms med=149.01ms max=742.76ms p(90)=164.28ms p(95)=271.84ms  |
| http_req_failed          | 0.00% ✓ 0        ✗ 4301                                                           |
| http_req_receiving       | avg=3.02ms   min=0s       med=0s       max=166.88ms p(90)=978.7µs  p(95)=1.08ms    |
| http_req_sending         | avg=15.38µs  min=0s       med=0s       max=1.06ms   p(90)=0s       p(95)=0s        |
| http_req_tls_handshaking | avg=7.3ms    min=0s       med=0s       max=364.33ms p(90)=0s       p(95)=0s        |
| http_req_waiting         | avg=154.82ms min=129.05ms med=148.48ms max=742.76ms p(90)=162.47ms p(95)=170.09ms  |
| http_reqs                | 4301   84.103344/s                                                                 |
| iteration_duration       | avg=1.17s    min=1.13s    med=1.15s    max=1.77s    p(90)=1.17s    p(95)=1.31s     |
| iterations               |  4301   84.103344/s                                                                |
| vus                      |  13     min=13      max=100                                                        |
| vus_max                  |  100    min=100     max=100                                                        |

![image](https://user-images.githubusercontent.com/68401766/153075545-966724e4-5d91-4068-924f-640d7bf2b308.png)
