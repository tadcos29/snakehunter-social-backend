# Snakehunter API - Social Network Backend

## Introduction and Purpose:

NoSQL databases such as MongoDB are a popular choice for social media and adjacent projects, thanks to their ability to handle large amounts of variously formatted and unstructured data. This bootcamp exercise provided me with a welcome opportunity to practice designing API query routes for MongoDB using mongoose, as a stepping stone to full MERN stack applications.

## Scenario:

A fictional social media start-up desires a NoSQL database for its website.

## Results and Technical Overview:

### Walkthrough Video 

[Google drive link](https://drive.google.com/file/d/1DrBYT7vzSYHZcQsEy5wQ9BFUjDki-5cj/view?usp=sharing). Please view at full screen for best results.

## Installation

`npm i` to install the application.

`npm start` will launch the application's server.

The github repository for this application may be found at [https://github.com/tadcos29/snakehunter-social-backend/](https://github.com/tadcos29/snakehunter-social-backend/)

## Functionality

This rudimentary 'social network' backend is structured around 'user' and 'thought' models with a 'reactions' subcollection associated with the 'thoughts'. It seeks to implement the core social interaction dynamic: users may publish thoughts on their profiles for others to react to. All the standard CRUD operation routes are provided for users and thoughts, and create and delete routes are provided for reactions.

### Example: User list in Insomnia.

![image](https://user-images.githubusercontent.com/121476474/227942626-2098bb08-3a04-416b-937d-02f981deddcd.png)

## Testing and Dependencies

In addition to MongoDB and the mongoose library, the application uses Day.js to format its dates.

## License

MIT
