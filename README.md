
# sasnaka-backend-API
## Introduction
Sasnaka Sansada is a charitable social service organization was formed with the intention of building a just and equitable society with high level of human morality. 

Sasnaka Sansada website is used as a platform for donors to help through online transactions, interested parties to get information and for editorial staff to manage content.

This repository contains the backend API for the sasnaka-sansada web application. 

## Main Functionalities
- Payment gateway for donations
- Feedback section
- Ongoing project details
- Member details
- Joining to the organization

## Technologies
- Environment - NodeJS
- Framework - ExpressJS
- ORM - Sequelize
- DBMS - PostgreSQL
- Functional Testing - Mocha, Chai
- Validation - hapi/ joi

##  Configuration
1. Download and install nodeJS to your device from the official website.
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download and install MySQL.
[MySQL Official Download Page](https://www.mysql.com/downloads/)
3. Create a user and a database.
4. Clone the git repository by running the following command
	```bash
	git clone https://github.com/Sasnaka-Sansada/sasnaka-backend.git
	```
5. Create a .env file inside the root directory and add configuration variables to the file. Please see the sample.env file as an example.
6. Open the command prompt/ terminal inside the repository and run, 
	```bash 
	npm install
	```

Change the env variables to add new database connection variables.
1.  Run below command to start the server in the development mode. The server will be running in the 8080 port
```bash 
	npm run dev
```
2. Run below command to start the server in the production mode.
```bash 
	npm run start
```

## Contributors
- Gayal Dassanayake 
	- [GitHub](https://github.com/gayaldassanayake)
	- [LinkedIn](https://www.linkedin.com/in/gayal-dassanayake/)
