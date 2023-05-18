# Acebook - Team Earth
<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Description](#project-description)
  - [Features](#features)
  - [Technologies](#mern-stack-and-other-technologies)
- [How to install](#how-to-install)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [How to run tests](#start)
    - [1. Backend](#the-backend-(API))
    - [2. Frontend](#the-frontend-(React))
- [Team Earth](#team-earth)

<!-- ABOUT THE PROJECT -->
## Project Description

![homepage preview](./path/to/homepage/screenshot/here.png)

Acebook is a MERN stack web application that emulates key features of Facebook. It allows users to create profiles, post messages and pictures, and react to others' content by liking or disliking and commenting on posts.

Our task involved enhancing and expanding an existing application. We faced the challenge of familiarising ourselves with the inherited codebase while working to improve and extend it.

### Features

- **User Authentication**: Acebook can allow users to register, login and logout securely.
- **User Profile**: Users can sign up and will have a Profile that shows their own posts.
- **Posts**: Users can post messages and photos with other users. They can like and comment on other users' posts.

### MERN STACK AND OTHER TECHNOLOGIES

- [![Mongodb][mongodb-badge]][mongodb-url]
- [![Express][express-badge]][express-url]
- [![React][react-badge]][react-url]
- [![Node.js][node-badge]][node-url]

additional tools:

- [Jest](https://jestjs.io/) for unit testing on the back end
- [Cypress](https://www.cypress.io/) for end-to-end testing and component testing, on the front end
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [Handlebars](https://handlebarsjs.com/) for the `home` template.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Multer](https://www.npmjs.com/package/multer) for handling multipart/form-data, to upload photos
- [@fortawesome/fontawesome-free](https://github.com/FortAwesome/Font-Awesome)

<!-- INSTALLATION -->
## How to install

This section shows you how to set up this project locally. First, get a local copy up and running follow these simple steps.

### Prerequisites

Before running the project, ensure thatyou have installed `mongodb`, `npm` and `node` in your local machine. If they are not installed, please follow the steps below.

- npm

  ```bash
  npm install npm@latest -g
  npm -v
  ```

- nvm & node

<!-- visit <https://github.com/nvm-sh/nvm> for more information on how to install nvm -->

  ```bash
  brew install nvm
  nvm install node
  node -v
  ```

- mongodb

  ```bash
  brew tap mongodb/brew
  brew install mongodb-community@5.0
  brew services start mongodb-community@5.0
  ```

---

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/siqbal181/acebook-mern-template.git
   ```

2. Install NPM packages

   ```bash
   cd acebook-mern-template
   npm install

   cd api
   npm install

   cd ../frontend
   npm install
   ```

---
 <!-- TESTING -->
### How to run the tests

#### The Backend (API)

**Note the use of an environment variable for the JWT secret**

Start the server in test mode (so that it connects to the test DB)

```bash
; cd api
; JWT_SECRET=SUPER_SECRET npm run start:test
```

Then run the tests in a new terminal session

```bash
; cd api
; JWT_SECRET=SUPER_SECRET npm run test
```

#### The Frontend (React)

**Note the use of an environment variable for the JWT secret**

  Start the server in test mode (so that it connects to the test DB)

  ```bash
  ; cd api
  ; JWT_SECRET=SUPER_SECRET npm run start:test
  ```

  Then start the front end in a new terminal session

  ```bash
  ; cd frontend
  ; JWT_SECRET=SUPER_SECRET npm start
  ```

  Then run the tests in a new terminal session

  ```bash
  ; cd frontend
  ; JWT_SECRET=SUPER_SECRET npm run test
  ```

<!-- CONTRIBUTORS -->
## Team Earth

We are team `Earth`:

<table>
  <tr>
   <td align="center"><a href="https://github.com/siqbal181"><img src="https://avatars.githubusercontent.com/u/114309741?v=4" width="100"/><br />Sidra Iqbal</a></td>
   <td align="center"><a href="https://github.com/SamWhite745"><img src="https://avatars.githubusercontent.com/u/35996570?v=4" width="100"/><br />Sam White</a></td>
   <td align="center"><a href="https://github.com/toppy007"><img src="https://avatars.githubusercontent.com/u/33899845?v=4" width="100"/><br />Chris Toplisek</a></td>
   <td align="center"><a href="https://github.com/Serkan-00"><img src="https://avatars.githubusercontent.com/u/124393940?v=4" width="100"/><br />Serkan</a></td>
   <td align="center"><a href=""><img src="" width="100" /><br />Hande Küçükünsal</a></td>
   <td align="center"><a href="https://github.com/maddc0de"><img src="https://avatars.githubusercontent.com/u/97564411?v=4" width="100" /><br />Madelane Daz</a></td>
  </tr>
</table>

<!-- https://github.com/Ileriayo/markdown-badges -->

[mongodb-badge]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[express-badge]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express-url]: https://expressjs.com/
[react-badge]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react-url]: https://react.dev/
[node-badge]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/
