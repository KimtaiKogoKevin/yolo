# Kimutai Kogo Kevin IP week 8 

## Choice of Kubernetes Objects used (Infrastructure Components)
### Cluster 
I created a cluster named ip8-cluster , with a location / zone of __us-central1-a__ , the cluster contains __3 nodes__  , having one control plane and two other worker nodes.



### Pods 
The pods that are present in my nodes are 
- backend-application-deployment-6bd4cdf787-q68fs   
- backend-application-deployment-6bd4cdf787-s4swr    
- frontend-application-deployment-6977b88dcb-2bbtk   
- frontend-application-deployment-6977b88dcb-6sl7b   
- mongo-0  

The first two pods are for the backend deployment , while the second two  pods are for the front end deploymnet  and the last pod is for mongo db .


#### Backend Deployment 
The backend deployment is specified in the backend.yaml file which is found in the _backend directory_ , This file defines the _name of the deployment , name of the container to run in this deployment , the image pulled from docker hub  the port that this container will use as well as the number of replicas which are two in this case . The image used in this deployment is  [this one](https://hub.docker.com/r/kimutaikk/backend_image_yolo).

#### The Backend Service
In the same directory as the backend.yaml file there is a file called backend service , this file is used to expose the deployed pod to the external internet  , it defines a load balancer in the spec section that will  distribute traffic across the two instances of the backend application , it also maps the port 80 on the local machine to port  5000 on the backend application .


#### Frontend Deployment 
The frontend deployment is specified in the client.yaml file which is found in the _client directory_ , This file defines the _name of the deployment , name of the container to run in this deployment , the image pulled from docker hub  the port that this container will use as well as the number of replicas which are two in this case . The image used in this deployment is  [this one](https://hub.docker.com/r/kimutaikk/client_image_yolo).

#### The Frontend Service
In the same directory as the client.yaml file there is a file called __clientService.yaml__ , this file is used to expose the deployed pod to the external internet  , it defines a load balancer in the spec section that will  distribute traffic across the two instances of the frontend application , it also maps the port 80 on the local machine to port  3000 on the client  application .




### Mongo DB 
In the root of the project there eexists a folder called _mongoDb_ this folder has two files namely __mongodb-service.yaml__ and __mongodb-statefulset.yaml__ .

#### MongoDB Service 
The _mongodb-service.yaml file_ specifies how we expose the mongo db stateful set to the external internet , it defines the app and service names as well as the port on which we are fowarding trafic from the local machine to the stateful set , in this case it remains to be the port 27017.

#### MongoDB StatefulSet

The _mongodb-statefulset.yaml file_ defines a StatefulSet , this set defines a service  by the name  mongodb , the number of replicas as one and the container which we are running , this container is named mongodb as well . It also defines the image we are using , in this case we are using this image ***mongo:4.0.1.7*** ,and the port the container uses is port 27017.
A volume named __pvc__ is used and mounted on the path __/data/db__ .  Note __pvc__ stands for persistant volume claim. In the __volumeClaimTemplates__ section we have a description of the volume defined above ,  it is given an access mode of ReadWriteOnce and assigned storage resources amounting to __100Gi__.
The connection string that connects the backend to mongo db is as follows __'mongodb://kogoman:'+dbPassword+'@mongodb-0.mongodb.default.svc.cluster.local:27017/'__. where kogoman is the username and dpPassword is the mongodb password , this passowrd is defined as a secret and is base 64 encoded , the remaining part consits of the hostname , which begins with the deployment name followed by the service name , then the default name space and then __svc.cluster.local:27017__.


## Are the applications running successfully.

The backend and frontend applications are running very well , 
to access the application you can follow this link [yolomy](http://35.193.151.206:3000/). 
The mongodb database works well .
To be able to connect the backend to the frontend i had to change the ProductControl.js file and replace local host with the external IP address of the backend pod , this allowed for the frontend applictiion to send api requests to the backend pod and not to local host as  it was originally set up to do.
