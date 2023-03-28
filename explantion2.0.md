# Kevin Kimutai Kogo
## Configuration management using ansible 
### Inventory
- I decided to place the inventory and andible.cfg files in the /etc/ansible directory. To access this directory open your terminal and from your root directory: 
- cd into /etc *** do not forget the slash *** 
- cd into ansible and open in code  *** cd ansible code . ***

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