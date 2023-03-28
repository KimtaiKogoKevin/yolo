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
## Play one
### Installation of dependencies on all hosts
My playbook can be broken down into these steps 
- Installation of dependencies neccessary forDebian based systems using aptitude package manager , these sepenedencies include apt-transport-https , curl , software properties-common , python3-pip and others which i deemed neccessary such as nodeJS. 
- Addition of GPG key to verify installation of docker repo 
- Actual set up of docker repository
- Installation of docker community edition
- installation of docker modules for pyhton 

*** I referenced the above information from [this link](https://www.digitalocean.com/community/tutorials/how-to-use-ansible-to-install-and-set-up-docker-on-ubuntu-20-04#step-1-preparing-your-playbook) ***

## Play two 
## Installation and configuration of MongoDb on mongo database host

