### here-backend  

## Running with Docker Compose  

```  
docker compose up  
```  

## Local Development

First, you need to create MySQL container using the following command:  

```  
docker container run -p 3306:3306 -v "/$(pwd)/src/volume/mysql:/var/lib/mysql" -v "$(pwd)/src/scripts/init.sql:/docker-entrypoint-initdb.d/here.sql:ro" -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=here -e MYSQL_USER=dev -e MYSQL_PASSWORD=dev --name mysql mysql:5.7
```  

Then, you can start the server using the following command:  

```  
NODE_ENV=development npm start
```  

## API
Any endpoint that is exposed by the server can be accessible at the /doc endpoint. 
eg: localhost:3000/doc

