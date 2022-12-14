<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->


  <h3 align="left">README</h3>

  <p align="left">To get started, clone this repository and the capstone-server repository</p>
  
  <p align="left">After cloning the server repo, create a .env file where you will add the following variables: DB_NAME, DB_USER, DB_PASSWORD, SECRET, PORT (use the value 8080), and DB_HOST</p>
  
  <p align="left">Next, run the following in the CLI of the server AND the client to install all dependencies</p>
  
  ```bash npm i ```
  
  <p align="left">Create a medtrack database using MySQL called medtrack and plug in the DB information to your .env variables</p>
  
  <p align="left">After creating a database, run the following to create the tables</p>
  
  ```bash npx knex migrate:latest ```
  
  <p align="left"> Next, run the follwoing to seed the table with placeholder users</p>
  
  ```bash npx knex seed:run ```
  
  <p align="left">Now that everything is seeded and installed, use the following on the server side to boot up the development server</p>
  
  ```bash npm run dev ```
  
  <p align="left">On the client side, use the following to jump to the branch with local host endpoints</p>
  
  ```bash git checkout test ```
  
  <p align="left">On the frontend (client side), run the following to boot up the local site</p>
  
  ```bash npm start ```
  
  <p align="left">Now that both are running you should be good to contribute</p>
  


