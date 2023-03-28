# Kevin Kimutai Kogo
## Configuration management using ansible 
### Inventory
- I decided to place the inventory and andible.cfg files in the /etc/ansible directory. To access this directory open your terminal and from your root directory: 
- cd into /etc *** do not forget the slash *** 
- cd into ansible and open in code  *** cd ansible code . ***

# Host and ansible.cfg file description 

My host file contains the following content 

``` 

# Application servers
[backend]
192.168.60.4
[frontend]
192.168.60.5

# Database server
[mongo]
192.168.60.6

# Group 'multi' with all servers
[multi:children]
backend
frontend
mongo

# Variables that will be applied to all servers
[multi:vars]
ansible_ssh_user=vagrant
ansible_ssh_private_key_file=~/.vagrant.d/insecure_private_key  

ansible_ssh_common_args='-o StrictHostKeyChecking=no'

```

My ansible.cfg contains this content
```
[defaults]
inventory = hosts
remote_user = vagrant
private_key_file = .vagrant/machines/default/virtualbox/private_key
host_key_checking = False
```

# My vagrant file 
This vagrant file was created by running vagrant init in the root of the project directory. It contains configuration for the operating system we are using for this IP , which is [***geerlingguy/ubuntu20.04***](https://app.vagrantup.com/geerlingguy/boxes/ubuntu2004).
The network configuration , memory allocation as well the defention of my three servers which consist of :
- backend application server 
- frontend application server 
- mongodb database server 

These servers are the same ones defined in the host file above.

# My play book 
My playbook can be broken down into the following steps 

## Play one
### Installation of dependencies on all hosts
- Specify all hosts and add root permissions by setting become to yes/ true
- Installation of dependencies neccessary forDebian based systems using aptitude package manager , these sepenedencies include apt-transport-https , curl , software properties-common , python3-pip and others which i deemed neccessary such as nodeJS. 
- Addition of GPG key to verify installation of docker repo 
- Actual set up of docker repository
- Installation of docker community edition
- installation of docker modules for pyhton 

*** I referenced the above information from [this link](https://www.digitalocean.com/community/tutorials/how-to-use-ansible-to-install-and-set-up-docker-on-ubuntu-20-04#step-1-preparing-your-playbook) ***

## Play two 
## Installation and configuration of MongoDb on mongo database host

- specify host to mongo , which is the defined host name in the host file , also add root permissions by setting become boolean as true
- First task executed is pulling the mongo:latest iamge from docker  using the __docker_image module__, remember docker was intalled on all hosts in play one 
- The next task is running the mongo container , setting its name , state and port using the __docker_container__ module 
- Next I specify a network and connect the mongo db container to it using the __docker_network module__
- And lastly I specify a volume , asign it to the  default volume directoy for mongodb which is **data/db** 


## Play Two 
## Installation of the backend docker image and running the container

- specify host to backend , which is the defined host name in the host file , also add root permissions by setting become boolean as true
- First task executed is pulling the [__kimutaikk/backend_image_yolo:v1.0.3__]() image from docker  using the __docker_image module__, remember docker was intalled on all hosts in play one 
- The next task is running the backend container , setting its name , state and port using the __docker_container__ module 
- Next I specify a network and connect the backend container to it using the __docker_network module__
- And lastly I specify a volume , asign it to the  default volume directoy for mongodb which is **data/db** 

## Play Three
## Installation of the cliient docker image and running the container

- specify host to frontend , which is the defined host name in the host file , also add root permissions by setting become boolean as true
- First task executed is pulling the [__kimutaikk/client_image_yolo:v1.0.1__]() image from docker  using the __docker_image module__, remember docker was intalled on all hosts in play one 
- The next task is running the frontend container , setting its name , state and port using the __docker_container__ module 
- Next I specify a network and connect the frontend container to it using the __docker_network module__
- And lastly I specify a volume , asign it to the  default volume directoy for mongodb which is **data/db** 

# To run this play book 
- Ensure you are in the root directory of the  project where the vagrant file is located 
- run vagrant up to start up the virtual machines 
- run vagrant provison to provison them with the neccessary resources 
- run __ansible-playbook main.yml 

# To start the client application 
- once the play book has ran with the above commands 
- run ***vagrant ssh frontend** to access the front end virtual machine 
- This machine contains a running container called *** client_container *** as defined in the main.yml playbook file
- run *** sudo exec -it client_container sh *** to access the running container
- once in the container , you will see the working directory app 
- From here run npm start , it should dtart the development server 
- To access the application on your browser use the IP address defiend in the vagrant file , either **192.168.60.8:2222** or **192.168.60.7:2222** . It should open the homepage of the E-commerce shop