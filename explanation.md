# Basic Microservice 
### Choice of image 
##### Backend and Clientside node image
I researched the various node images available on the docker hub registry to determine the best Node.js  image to use for this task.
Some of the aspects put into consideration were the number of dependencies the image has as well as the number of security issues the specific package has, in this case, the default node image had 409 Os dependencies and over 289 vulnerabilities.
The node: bullseye image also had the same number of dependencies and vulnerabilities as the default node image, however, the slim version of the node: bullseye image had a significant reduction in OS dependencies and OS security vulnerabilities which were 97 and 55 respectively.  Among all of the images I was experimenting with, the smallest was the node: alpine image, it had 16 Os dependencies and 2 OS security vulnerabilities.
The alpine image turns out to be a Linux-based operating system that was specifically built to be used inside containers,however, it did come with some drawbacks such as compatibility issues and unexpected bugs, especially with python images.
Weighing the pros and cons mentioned above my final decision was to go with the alpine image , mainly due to the requirement of having our images below 400 MB. 
The [client image](https://hub.docker.com/repository/docker/kimutaikk/client_image_yolo)  and the [backend image](https://hub.docker.com/repository/docker/kimutaikk/backend_image_yolo), which both use node:12-alpine had a size of 270MB and 119 MB respectively, bringing the total image size of these two images to 389MB.
