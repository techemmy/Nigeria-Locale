<a name="readme-top" id="readme-top"></a>
# Nigeria Locale

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
        <a href="#contributing">Contributing</a>
        <ul>
            <li><a href="#new-contributor-guide">New Contributor Guide</a></li>
        </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
---
Nigeria Locale is a developer tool for anyone who needs to know Nigeria, geographically at least. The API shows you all of Nigeria’s regions, states, and local government areas(LGAs). Locale is looking to be a very useful tool for the thousands of businesses building for Nigeria’s 200M+ population size.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/) - JavaScript runtime environment
* [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) - Web framework for Node.js
* [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) - NoSQL database
* [![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/) - In-memory data structure store
* [![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/) - Tool for generating and verifying tokens based on credentials
- [![Mongoose](https://img.shields.io/badge/Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongoose)](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/) - JavaScript testing framework
- [![Jest](https://img.shields.io/badge/-Supertest-%23C21325?style=for-the-badge)](https://github.com/ladjs/supertest#readme) - HTTP assertions made easy via superagent
- [![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/) - Simplify API development, documentation and visualization
- [![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)](https://nodemon.io/) - Reload local server on file changes


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
Make sure you have [Node.Js](https://nodejs.org/en) and [Redis](https://redis.io/docs/getting-started/) installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/techemmy/nigeria-locale.git
   ```
2. Enter the project directory
   ```sh
   cd nigeria-locale
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure the environment variables. Fill in the environment variables appriopriately
   - You can generate a random string for the `JWT_SECRET` variable using this command: `openssl rand -hex 32`
   ```sh
   cp .example.env .env
   ```
5. Start the redis server
  ```sh
   redis-server
  ```
6. Run the development server
   ```sh
   npm run dev
   ```
 Voila! 🥳

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Online documentation - Visit [here](https://emmanuel.stoplight.io/docs/nigeria-locale/branches/main/dlhz390kuiehu-nigeria-locale)
* Swagger documentation can be found at the [`/api-docs`](http://nigeria-locale.onrender.com/api-docs) route of the localhost development server or hosted app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### New contributor Guide

Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

