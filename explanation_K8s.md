# Kimutai Kopko Kevin IP week 8 

## Choice of Kubernetes Objects used (Infrastructure Components)
### Cluster 
I created a cluster named ip8-cluster , with a location / zone of __us-central1-a__ , the cluster contains __3 nodes__  , having one control plane and two other worker nodes.
# dummy text


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

The _mongodb-statefulset.yaml file_ defines a StatefulSet , this set defines the service name as mongo , the number of replicas as one and the container which we are running , this container is named mongo as well . It also defines the image we are using , in this case we are using this image ***mongo:4.0.1.7*** ,and the port the container uses is port 27017.
A volume named __pvc__ is used and mounted on the path __/data/db__ .  Note __pvc__ stands for persistant volume claim. In the __volumeClaimTemplates__ section we have a description of the volume defined above ,  it is given an access mode of ReadWriteOnce and assigned storage resources amounting to __100Gi__.


## Are the applications running successfully.

The backend and frontend applications are running very well , 
to access the application you can follow this link [yolomy](http://34.133.21.126/). 
However the mongoDB stataefulset seems to have an issue , whenever i run the command _kubectl get pods_ the mongodb statefulset seems to be stuck on the status __pending__ ,the folowing output is what is displayed __mongo-0      0/1     Pending   0          67m__ . In addition to that when i check the logs of the backend application there is an error thrown that inidcates it cannit connect to the mongodb database . Using this command __kubectl logs backend-application-deployment-6bd4cdf787-q68fs__ to check the logs of the backend , i get the following error.

### NOTE: At the time of writing this i am still trying to debug why the mngodb stateful set is not working


```

> yolo_app@1.0.0 start /app
> node server.js

Server listening on port 2222
MongooseServerSelectionError: getaddrinfo ENOTFOUND mongo
    at NativeConnection.Connection.openUri (/app/node_modules/mongoose/lib/connection.js:847:32)
    at /app/node_modules/mongoose/lib/index.js:351:10
    at /app/node_modules/mongoose/lib/helpers/promiseOrCallback.js:32:5
    at new Promise (<anonymous>)
    at promiseOrCallback (/app/node_modules/mongoose/lib/helpers/promiseOrCallback.js:31:10)
    at Mongoose._promiseOrCallback (/app/node_modules/mongoose/lib/index.js:1149:10)
    at Mongoose.connect (/app/node_modules/mongoose/lib/index.js:350:20)
    at Object.<anonymous> (/app/server.js:16:10)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47 {
  reason: TopologyDescription {
    type: 'Single',
    setName: null,
    maxSetVersion: null,
    maxElectionId: null,
    servers: Map { 'mongo:27017' => [ServerDescription] },
    stale: false,
    compatible: true,
    compatibilityError: null,
    logicalSessionTimeoutMinutes: null,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    commonWireVersion: null
  }
}
(node:18) UnhandledPromiseRejectionWarning: MongooseServerSelectionError: getaddrinfo ENOTFOUND mongo
    at NativeConnection.Connection.openUri (/app/node_modules/mongoose/lib/connection.js:847:32)
    at /app/node_modules/mongoose/lib/index.js:351:10
    at /app/node_modules/mongoose/lib/helpers/promiseOrCallback.js:32:5
    at new Promise (<anonymous>)
    at promiseOrCallback (/app/node_modules/mongoose/lib/helpers/promiseOrCallback.js:31:10)
    at Mongoose._promiseOrCallback (/app/node_modules/mongoose/lib/index.js:1149:10)
    at Mongoose.connect (/app/node_modules/mongoose/lib/index.js:350:20)
    at Object.<anonymous> (/app/server.js:16:10)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
(node:18) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:18) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

