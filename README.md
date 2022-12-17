## Running with Docker Compose  
You can start the server using the following command:    
```  
docker compose up --build -d  
```  
Server is now accessible at the  
```  
localhost:3000  
```  
You can delete the containers using the following command:  
```  
docker compose down  
```
## Swagger Page   
Any endpoint that is exposed by the server can be accessible at the /doc endpoint.  
```  
eg: localhost:3000/doc  
```  

## Local Development
### Database   
First, you need to create MySQL container using the following command:  

```  
docker container run -p 3306:3306 -v "/$(pwd)/src/scripts/init.sql:/docker-entrypoint-initdb.d/here.sql:ro" -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=here -e MYSQL_USER=dev -e MYSQL_PASSWORD=dev -d --name mysql mysql:5.7
```  

* After development, you can delete the container using the following command:   
```
docker container rm mysql -f
```

### Backend  
Then, you can start the server using the following command:  

```  
NODE_ENV=development npm start
```  

