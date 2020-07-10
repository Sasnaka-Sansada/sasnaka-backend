
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
2. Download and install PostgreSQL.
[https://www.postgresql.org/download/](https://www.postgresql.org/download/)
3. Create a user and a database.
	a. Method I - Using the CLI 
		Please refer this document for step by step instructions
		[How to manage PostgreSQL databases and users from the command line](https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line)
	b. Method II - Using gpAdmin 4
	Download, install pgAdmin 4 and create a user and a database using the GUI.
	[https://www.pgadmin.org/download/](https://www.pgadmin.org/download/)
		 
4. Clone the git repository by running the following command
	```bash
	git clone https://github.com/Sasnaka-Sansada/sasnaka-backend.git
	```
5. Open the command prompt/ terminal inside the repository and run, 
	```bash 
	npm install
	```
6. Create a .env file inside the /src  directory and add configuration variables to the file. Please request the file content from a system administrator. 
Change the env variables to add new database connection variables.
7.  Run below command to start the server in the development mode.
```bash 
	npm run dev
```

## Contributors
- Gayal Dassanayake 
	- [GitHub](https://github.com/gayaldassanayake)
	- [LinkedIn](https://www.linkedin.com/in/gayal-dassanayake/)
