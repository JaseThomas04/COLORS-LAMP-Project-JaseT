# COLORS_LAMP_Project_JaseT
Running a LAMP Stack on Digital Ocean to query and insert data into a SQL database; Build a domain that connects frontend to backend with API

COLORS Application
  - The COLORS application allows the user to log into an account and perform operations such as: (1) Adding colors and (2) Searching for colors.
  - The search function supports partial matching.

Technologies Used
  - The domain was purchased with GoDaddy.
  - The server where the data and files are hosted were purchased as a droplet on Digital Ocean

Setup Instructions
  - Create a Digital Ocean account and a GoDaddy account (or any other website that lets you purchase domains, like PorkBun)
  - Log in to Digital Ocean account, go to https://marketplace.digitalocean.com/apps/lamp and select "Create LAMP Droplet"
  - Select San Francisco as your region, "Droplet Type" is Shared CPU (basic). Choose "Premium Intel" as your CPU and select the 8$/month option
  - Click "Create Droplet"
  - Go to GoDaddy, Porkbun, or whatever website you can use to purchase a domain. These steps will bias GoDaddy
  - On GoDaddy, Go under the "Domains" dropdown and select "Manage" on the domain you purchased
  - Click on the "Domain" tab and change the "Data" field to the IP address that is on the Digital Ocean droplet
  - Change "TTL" to 600 seconds
  - Wait about an hour for droplet and domain to connect



  - Open command prompt and run:
          ssh root@MyDomainOrIPAddress
    where you enter either the domain or ip address after @
  - Go to the /var/www/html directory
  - Edit the index.html file
  - Should look like this:
          <html>
            <body>
              <h1>We love COP 4331</h1>
            </body>
          </html>
  - Save and close the file
  - Go to a browser and enter in http://IPAddress or http://domain. Should navigate to the same place
  - The webpage should load and display "We love COP 4331" and nothing else



  - While SSHed into the droplet, connect to MySQL with
          mysql -u root -p
    Which connects to MySQL for the database
  - To create the database, you run these commands (replace {database_name} with a string for the name, ex: {database_name} = colormanager):
          create database {database_name}; 
          use {database_name};
  - To create the database tables, copy and run everything below while connected to database. Separate by the lines, so 5 copy-and-pastes

          CREATE TABLE `{database_name}`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName`
              VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login`
              VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
              PRIMARY KEY (`ID`)) ENGINE = InnoDB;
      ----------------------------------------------------------------------------------------------
          CREATE TABLE `{database_name}`.`Users`
          (
              `ID` INT NOT NULL AUTO_INCREMENT ,
              `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
              `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
              `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
              `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
              PRIMARY KEY (`ID`)
          ) ENGINE = InnoDB;
      ----------------------------------------------------------------------------------------------
          CREATE TABLE `{database_name}`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name`
              VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY
              (`ID`)) ENGINE = InnoDB;
      ----------------------------------------------------------------------------------------------
          CREATE TABLE `{database_name}`.`Colors`
          (
              `ID` INT NOT NULL AUTO_INCREMENT ,
              `Name` VARCHAR(50) NOT NULL DEFAULT '' ,
              `UserID` INT NOT NULL DEFAULT '0' ,
              PRIMARY KEY (`ID`)
          ) ENGINE = InnoDB;
      ----------------------------------------------------------------------------------------------
          CREATE TABLE `COP4331`.`Contacts`
          (
              `ID` INT NOT NULL AUTO_INCREMENT ,
              `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
              `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
              `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
              `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
              `UserID` INT NOT NULL DEFAULT '0' ,
              PRIMARY KEY (`ID`)
          ) ENGINE = InnoDB;

  - Then, copy and run these commands for inserting data:

          insert into Users (FirstName,LastName,Login,Password) VALUES
          ('Aashish','Yadavally','AYadavally','COP4331');
          insert into Users (FirstName,LastName,Login,Password) VALUES ('Sam','Hill','SamH','Test');
          insert into Users (FirstName,LastName,Login,Password) VALUES
          ('Aashish','Yadavally','AYadavally','5832a71366768098cceb7095efb774f2');
          insert into Users (FirstName,LastName,Login,Password) VALUES
          ('Sam','Hill','SamH','0cbc6611f5540bd0809a388dc95a615b');
          insert into Colors (Name,UserID) VALUES ('Blue',1);
          insert into Colors (Name,UserID) VALUES ('White',1);
          insert into Colors (Name,UserID) VALUES ('Black',1);
          insert into Colors (Name,UserID) VALUES ('gray',1);
          insert into Colors (Name,UserID) VALUES ('Magenta',1);
          insert into Colors (Name,UserID) VALUES ('Yellow',1);
          insert into Colors (Name,UserID) VALUES ('Cyan',1);
          insert into Colors (Name,UserID) VALUES ('Salmon',1);
          insert into Colors (Name,UserID) VALUES ('Chartreuse',1);
          insert into Colors (Name,UserID) VALUES ('Lime',1);
          insert into Colors (Name,UserID) VALUES ('Light Blue',1);
          insert into Colors (Name,UserID) VALUES ('Light Gray',1);
          insert into Colors (Name,UserID) VALUES ('Light Red',1);
          insert into Colors (Name,UserID) VALUES ('Light Green',1);
          insert into Colors (Name,UserID) VALUES ('Chiffon',1);
          insert into Colors (Name,UserID) VALUES ('Fuscia',1);
          insert into Colors (Name,UserID) VALUES ('Brown',1);
          insert into Colors (Name,UserID) VALUES ('Beige',1);
          insert into Colors (Name,UserID) VALUES ('Blue',3);
          insert into Colors (Name,UserID) VALUES ('White',3);
          insert into Colors (Name,UserID) VALUES ('Black',3);
          insert into Colors (Name,UserID) VALUES ('gray',3);
          insert into Colors (Name,UserID) VALUES ('Magenta',3);
          insert into Colors (Name,UserID) VALUES ('Yellow',3);
          insert into Colors (Name,UserID) VALUES ('Cyan',3);
          insert into Colors (Name,UserID) VALUES ('Salmon',3);
          insert into Colors (Name,UserID) VALUES ('Chartreuse',3);
          insert into Colors (Name,UserID) VALUES ('Lime',3);
          insert into Colors (Name,UserID) VALUES ('Light Blue',3);
          insert into Colors (Name,UserID) VALUES ('Light Gray',3);
          insert into Colors (Name,UserID) VALUES ('Light Red',3);
          insert into Colors (Name,UserID) VALUES ('Light Green',3);
          insert into Colors (Name,UserID) VALUES ('Chiffon',3);
          insert into Colors (Name,UserID) VALUES ('Fuscia',3);
          insert into Colors (Name,UserID) VALUES ('Brown',3);
          insert into Colors (Name,UserID) VALUES ('Beige',3);

      - Now run:
          use {database_name};
          create user '{database_user_username}' identified by '{database_user_password}';
          grant all privileges on {database_name}.* to '{database_user_username}'@'%'
      - Choose whatever values you want for {database_user_username} and {database_user_password}
      - Go back to droplet
   

      - Now under /var/www/html create these directories:
              mkdir css
              mkdir images
              mkdir js
              mkdir api

      - The four directories in this repo: css, images, js, and api are exactly how these directories in the droplet should look. Copy every file over from this repo to the directory in the droplet with the exact name. (Ex: Everything in the api directory on this repo should be in the api directory in the droplet
      - *IMPORTANT*: Go into the code.js file. At the top, change the domain to your domain
      - *IMPORTANT*: In all three php files, change this line:
              $conn = new mysqli("localhost", "username", "password", "database");
                        to
              $conn = new mysqli("localhost", "{database_user_username}", "{database_user_password}", "{database_name}");

      - Try going into your domain on a browser.
      - Enter in login values from the table
