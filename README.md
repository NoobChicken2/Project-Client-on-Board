# Project-Client-on-Board

This project is for the subject Client on Board from the university Saxion University of Applied Sciences.

The group which made this project consisted of 7 students.

The point of the project was to create a webapp with consisted of fetching data from an API provided to us by a real client from a real company and displaying this data 
dynamically in the website. The client wanted the website to be used for converters of multiple companies.

We were receiving data from an API which provided us with a list of all the converters (used for in solar panels) and all the data regarding said converters.
We needed to create a CRON job for said API in order to get all the updated values of all the converters and if a specific converter had an issue we needed to create 
a ticket for that specific converter and notify the client and the company which owns this converter.


There are 3 Roles in our webapp. Global Admin, Company Admin and Client. When you log in based on the role you have different options to interact with the page.

- Global Admin
This admin can see and modify all the companies, all the converters and all the clients of the companies.

-Company Admin 
They can see and modify all their converters and all the clients which have their converters installed.

-Client
Can only see the statuses of their converters. They can have multiple converters from multiple companies.

My work on this project was mainly on:
- Setting up the whole work environment (all the libraries and modules needed) and organizing all the files.
- Creating a database design and the database script for creating the Tables
- Creating the main page of the webapp and having it dynamically change depending on the role
- Creating the token system for logging in
- Fixing various bugs and issues frontend wise and adding some small features to the website

What was used in this project?
- Svelte framework (frontend)
- Bootstrap (frontend)
- Node.js with Express.js library (backend)
- Postgresql (database)
