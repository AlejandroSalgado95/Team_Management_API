# STM Web App
> This is a MERN stack application, used for the STM system. This repository consists of a RESTful API made with ExpressJS and Mongoose, along with a web client made with ReactJS.

## Quick Start

In order to run this project locally, you must do the following steps: 

1. Make your own .env file. The environment variables that you need are included in the .env_sample file 

2. In the 'axiosConfig.js' file, located at 'react_src/api_calls/axiosConfig.js', make the following changes:

```bash
# Uncomment the base url pointing to your computer on port 3000

baseURL: "http://localhost:3000"
//baseURL:"https://team-management-api.herokuapp.com/"

//instance.defaults.baseURL = 'https://team-management-api.herokuapp.com/';
instance.defaults.baseURL = "http://localhost:3000";

```

3. Make use of the following commands:

```bash
# Install dependencies for server
npm install

# Either run the Express server only
npm run start 

# Or run the Express server only and automatically watch for changes
npm run watch

# Make a development build of your React code any time you make changes to it
npm run build:dev

```


## App Info

### Author

Alejandro Salgado

### Deployment

URL: https://stm-webapp.herokuapp.com/

### Version

1.0.0

### Release notes
- Protected routes 
- Session management 
- Push notifications (Android clients only)
- Chat (Android clients only)

## User manual

1. Admin account
* account: admin1
* password: 12345admin112345

2. User account
* account: user1
* password: 12345user112345

3. Notes
* The "aaleman" admin account has been set to be undeleteable and unupdatable by other admins
