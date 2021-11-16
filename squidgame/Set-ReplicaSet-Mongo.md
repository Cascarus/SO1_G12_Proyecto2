# Converting Standlone mongo DB to Replica Set
In this case of use, the replica set it is going to be use to listen to all inserts and updates going through the database, this for realtime reports.

## 1. Install mongo
The fist requirement is to have mongo installed. It can be installed by following the offical page documentation.
[Mongo Community Edition - Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
>  **Note:** For this guide the mongo service installed was MongoDB 5.0.3 Community Edition on Ubuntu 18

## 2. Preparing mongod.conf File
Once the mongo service is running correctly let's edit the mongod.conf file. This file is in the default path wich is **/etc/mongod.conf**. After the file was open we are going to add the configuration below:

	net:
		port: 27017
		bindIp: 0.0.0.0 --> Allow outside traffic
	
	replication:
		replSetName: MyReplicaSetName

Then save the changes and restart the mongo service by using: **sudo systemctl restart mongod**
Check the mongo service: **sudo systemctl status mongod**
If everithing is ok, now let's open the mongo service by typing **mongo** or **mongosh** in the console.

Once we are inside the mongo shell, let's run the following command
	
	rs.initiate({
		_id: "MyReplicaSetName",
		version: 1,
		members: [
			{ _id: 0, host : "IP_ADDRESS" }
		]
	});
The output should be "OK" if everything is in order. Now the mongo shell would look something like this:

	MyReplicaSetName:PRIMARY> 

Now the instance is using the Primary replica, we can consume de DataBase in the client side.

## 3. Connection string

To connect our replica set throug a connection string, the formar would look like this:
*mongodb://host:27017/database?replicaSet=MyReplicaSetName&connectTimeoutMS=60000*

- **host**: The member host
- **database**: The data base we are going to consume
- **MyReplicaSetName**: The replica set name