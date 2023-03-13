# Kevin Kimutai Kogo
## Basic Microservice with Nodejs , MongoDB  and Docker-Compose. 
### Image selection Process
#### How I choose the  backend and client side Node images
I researched the various node images available on the docker hub registry to determine the best Node.js  image to use for this task.
Some of the aspects put into consideration were the number of dependencies the image has as well as the number of security issues the specific package has, in this case, the default node image had 409 Os dependencies and over 289 vulnerabilities.
The node: bullseye image also had the same number of dependencies and vulnerabilities as the default node image, however, the slim version of the node: bullseye image had a significant reduction in OS dependencies and OS security vulnerabilities which were 97 and 55 respectively.  Among all of the images I was experimenting with, the smallest was the node: alpine image, it had 16 Os dependencies and 2 OS security vulnerabilities.
The alpine image turns out to be a Linux-based operating system that was specifically built to be used inside containers,however, it did come with some drawbacks such as compatibility issues and unexpected bugs, especially with python images.
Weighing the pros and cons mentioned above my final decision was to go with the alpine image , mainly due to the requirement of having our images below 400 MB. 
The [client image](https://hub.docker.com/repository/docker/kimutaikk/client_image_yolo)  and the [backend image](https://hub.docker.com/repository/docker/kimutaikk/backend_image_yolo), which both use node:12-alpine had a size of 270MB and 119 MB respectively, bringing the total image size of these two images to 389MB.

#### Docker file  directives used for the client Image and backend Image


**FROM node:12-alpine as builder** 

_this line specifies the base image we are using to build the docker file, the from statement has an alias named builder, which allows me to copy the directory from this build stage and pass it to the other build stage which is documented below_

**WORKDIR /app** 

 _this directive sets the working directory of the container to be app_

**COPY package*.json  ./**  

_This directive copies the package.json and package.lock.json files to the containers working directory app_

**RUN npm install**

 _Installs the npm dependencies_

**COPY . .** 

_Copies the project's current directory to the specified directory in the container, in this case, it copies the current directory to the working directory app_

**FROM node:12-alpine** 

_This is the second build stage, it uses the same base image as the builder stage above_

**WORKDIR /app** 

 _set the working directory  of the second base image from the second build stage_

**COPY  - -from=builder /app /app** 

 _Copies all the content in the app directory of the fitst build into the app directory of the second build stage, in this way the already installed dependencies are added to the second build stage, which reduces the size of the image by a considerate amount_

**CMD [ “npm”, “start” ]**

 _This command starts the application by running the start script in the package.json file_

***The directies above were used for creating both the backend and the client  docker files which enable the creation of the images  which I used to run the containers***


### Docker Compose 
#### Services
My Docker compose file has  three services:

- mongo 
- backend
- client


#### mongo service explained line by line

* First we pull the image **mongo:latest** from the docker hub registry 
* Then the **container name** is set to 'kevins-mongodb-container'
**restart** : always ensures the container restarts regardless of the status 
* **ports**  --> This directive allows for the container to listen at the specified port i.e 27017 , the port listens to requests from external network and also internally within docker . The mapping of the port 27017:27017 , allows for one to access the services running inside the mongo container from the host machine ,  through this any requests made on port 27017 on the host will be redirected to the mongo container named 'kevins-mongodb-container'
* **volumes** maps the volume created globally to the directory where mongodb stores data which is _/data/db_ .
* **networks** -- The mongo service is  connected to the yolo_network ,which is created globally and uses a bridge network.


#### Creating a MongoDb User **!!IMPORTANT STEP!!**
To be able to use mongodb we need to create a user in the mongo container we created , this container was called kevins-mongodb-container, 
- Access the running containers  terminal using the command _sudo docker exec -it kevins-mongodb-container sh_.
- Once in the container type _mongosh_ , to acess the mongo db shell.
- Type use admin to set administartor credentials ,  it should notify you that it switched to admin database. Once that is done paste the following 

***note: You can use any username and password (pwd) value but they must be the same values used in the server,js Mongo Url***

 ```
 db.createUser(
    {
    user:"kevinkogo",
    pwd:"4DKRzGoYbWwS3iku",
    roles : [
        {
            role:"readWrite",
            db : "admin"
         }
        ]

    }   
)

```
- This creates the administartor user .
- switch to the database using the command _switch <database_name>_ , in this case the database name is ***yolomy*** 
- paste the script below   to create a user in the specific database 


 ```
 db.createUser(
    {
    user:"kevinkogo",
    pwd:"4DKRzGoYbWwS3iku",
    roles : [
        {
            role:"readWrite",
            db : "yolomy"
         }
        ]

    }   
)

```

- should respond with ok 
- you can view the user created using the command show users
- exit from the container .

*** This step is important because without it you will get an authentication failed error ***






##### backend service explained line by line

* The [backend image](https://hub.docker.com/repository/docker/kimutaikk/backend_image_yolo) is pulled from my docker hub repository , this image was created in the backend directory using the docker file present in the directory.
* **depends_on** specifies the mongo service , this means that for the backend image to be built successfully the mongo service needs to be up and running as it is depended on by the backend service.
* **ports**  --> This directive allows for the container to listen at the specified port i.e 5000 , the port listens to requests from external network and also internally within docker . The mapping of the port 5000:5000 , allows for one to access the services running inside the mongo container from the host machine ,  through this any requests made on port 5000 on the host will be redirected to the backend container
**networks** -- The backend service is also connected to the yolo_network ,which uses a bridge network and is  defined globally 


##### client service  explained line by line 
* The [client image](https://hub.docker.com/repository/docker/kimutaikk/client_image_yolo) is pulled from my docker hub repository , this image was created in the client directory using the docker file present in the directory.
* **depends_on**   For the client image to be built successfully the backend service needs to be up and running as it is depended on by the client service. The directive specifies that it depends on thew backend service
* **ports**  --> This directive allows for the container to listen at the specified port i.e 3000 , the port listens to requests from external network and also internally within docker . The mapping of the port 3000:3000 , allows for one to access the services running inside the mongo container from the host machine ,  through this any requests made on port 3000 on the host will be redirected to the client container





### Use of Volumes and Networks

**Volumes** 
* In my docker-compose.yml file , there is a global declaration that creates the volume  ***my_yolo_vol*** when the compose file runs.
* The directive ***volumes:my_yolo_vol:{}*** creates the volume globally
* This volume is then used in the mongo container , mongoDb by default stores its data at the **data/db** directory , as mentioned [here](https://www.mongodb.com/docs/manual/tutorial/manage-mongodb-processes/#start-mongod-processes). For the reasons mentioned in the link we map the newly created volume to this directory in the  mongo container .
* The diretive ***volumes: - my_yolo_vol:data/db*** , maps the created volume to the directory where mongo db stores its data.

**Networks**
* In the docker-compose.yml file , there is a global definiton that creates the ***yolo_network*** and sets its driver to be a bridge , making it a bridge network.  By inpsecting the ***yolo_network*** it can be observed that two services are connected to it , these services are _mongo  and backend_ .
* The mongo service communicates with the backend service through the server,js file , specifically through this line 
> let mongodb_url='mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/'
* This line takes the **MONGODB_USER**  as well as the **MONGODB_PASSWORD**, which are specified in the env file , the host part is the name of the service **mongo** followed by the services port **27017** .


## contents of my .env file 

```

MONGODB_USER = kevinkogo 
MONGODB_PASSWORD = 4DKRzGoYbWwS3iku

```


### Git Workflow Used 
####  Basic Work Flow
- Created a fork of the project 
- Cloned the copy / fork to my local machine 
- used the basic workflow where all the changes i made are pushed to the central repository  that i forked on my github .
Link to github project [here](https://github.com/KimtaiKogoKevin/yolo)

 



 




