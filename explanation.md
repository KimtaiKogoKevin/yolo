# Basic Microservice with Nodejs , MongoDB , MongoExpress and Docker-Compose.
### Image selection Process
##### How I choose the  backend and client side Node images
I researched the various node images available on the docker hub registry to determine the best Node.js  image to use for this task.
Some of the aspects put into consideration were the number of dependencies the image has as well as the number of security issues the specific package has, in this case, the default node image had 409 Os dependencies and over 289 vulnerabilities.
The node: bullseye image also had the same number of dependencies and vulnerabilities as the default node image, however, the slim version of the node: bullseye image had a significant reduction in OS dependencies and OS security vulnerabilities which were 97 and 55 respectively.  Among all of the images I was experimenting with, the smallest was the node: alpine image, it had 16 Os dependencies and 2 OS security vulnerabilities.
The alpine image turns out to be a Linux-based operating system that was specifically built to be used inside containers,however, it did come with some drawbacks such as compatibility issues and unexpected bugs, especially with python images.
Weighing the pros and cons mentioned above my final decision was to go with the alpine image , mainly due to the requirement of having our images below 400 MB. 
The [client image](https://hub.docker.com/repository/docker/kimutaikk/client_image_yolo)  and the [backend image](https://hub.docker.com/repository/docker/kimutaikk/backend_image_yolo), which both use node:12-alpine had a size of 270MB and 119 MB respectively, bringing the total image size of these two images to 389MB.

###### Docker file  directives used for the client Image and backend Image
**FROM node:12-alpine as builder** _this line specifies the base image we are using to build the docker file, the from statement has an alias named builder, which allows me to copy the directory from this build stage and pass it to the other build stage which is documented below_

**WORKDIR /app**  _this directive sets the working directory of the container to be app_

**COPY package*.json  ./**  _This directive copies the package.json and package.lock.json files to the containers working directory app_

**RUN npm install** _Installs the npm dependencies_

**COPY . .** _Copies the project's current directory to the specified directory in the container, in this case, it copies the current directory to the working directory app_

**FROM node:12-alpine** _This is the second build stage, it uses the same base image as the builder stage above_

**WORKDIR /app** _set the working directory  of the second base image from the second build stage_

**COPY  - -from=builder /app /app**  _Copies all the content in the app directory of the fitst build into the app directory of the second build stage, in this way the already installed dependencies are added to the second build stage, which reduces the size of the image by a considerate amount_

**CMD [ “npm”, “start” ]** _This command starts the application by running the start script in the package.json file_

***The directies above were used for creating both the backend and the client applications docker files which enable the creation of the images from which i can run the container***


### Docker Compose 
##### Services
My Docker compose file has  four services , namely 
` ` ` 
mongo 
mongo-express
backend
client 

` ` ` 




