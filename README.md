# A Simple dockerized REST API with Express.JS



This is a dockerized sample to build a very simple [`CRUD`]([CRUD (Create, Read, Update, Delete) | Microsoft Docs](https://docs.microsoft.com/en-us/iis-administration/api/crud)) [`Rest API`](https://www.geeksforgeeks.org/rest-api-introduction/) using `NodeJs`, [`ExpressJs`](https://www.npmjs.com/package/express) & [`MongoDB`](https://www.mongodb.com/what-is-mongodb) (using [`mongoose`](https://www.npmjs.com/package/mongoose)) & [`mongo-express`]([GitHub - mongo-express/mongo-express: Web-based MongoDB admin interface, written with Node.js and express](https://github.com/mongo-express/mongo-express))(Web-based MongoDB admin interface, written with Node.js and express) & [`Nginx`](https://nginx.org/en/)as a proxy web server.



**Create your services in `docker-compose.yml` file:**

```yaml
version: "3"
services:
  mongodb:
    image: mongo:4.2
    container_name: mongodb
    networks:
      - api-net
    env_file: ./mongo_env
    volumes:
      - ./mongo-data:/data/db
  backend:
    image: backend-express
    container_name: backend-container
    build: 
      context: .
    depends_on:
      - mongodb
    networks: 
      - api-net
  mongo-express:
    image: mongo-express:0.54.0
    container_name: mongo-express
    depends_on:
      - mongodb
    networks:
      - api-net
    env_file: ./mongo-express_env
  nginx: 
    image: nginx:1.21
    container_name: nginx_proxy
    restart: on-failure
    depends_on:
      - backend
    networks: 
      - api-net
    ports:
      - "8080:8080"
      - "8081:8081"
    volumes:
      - ./conf.d/:/etc/nginx/conf.d/
networks:
  api-net:
```



**Create environments files for `mongodb` and `mongo-express`:**

`mongo_env` file:

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
```

`mongo-express_env` file:

```
ME_CONFIG_MONGODB_SERVER=mongodb
ME_CONFIG_MONGODB_URL=mongodb://root:root@mongodb:27017/mytestdb
ME_CONFIG_MONGODB_ADMINUSERNAME=root
ME_CONFIG_MONGODB_ADMINPASSWORD=root
ME_CONFIG_BASICAUTH_USERNAME=admin
ME_CONFIG_BASICAUTH_PASSWORD=admin
ME_CONFIG_MONGODB_ENABLE_ADMIN=true
```



**Note:** By default backend service listens on `TCP/8080` port and mongo-express is available on `TCP/8081`.