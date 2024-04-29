<!-- Using README template from: https://github.com/othneildrew/Best-README-Template/tree/master-->

<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/dalbanhi/karel-worlds">
    <img src="https://raw.githubusercontent.com/dalbanhi/karel-worlds/v0-production/public/assets/images/karelWorldsLogo.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Karel Worlds</h3>

  <p align="center">
    KarelWorlds is a web application that allows users to create, share, and attempt to solve Karel the Robot worlds.
    <br />
    <a href="https://github.com/dalbanhi/karel-worlds"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://karel-worlds.vercel.app/">View Deployment (v0)</a>.
    <br />
    <a href="https://www.loom.com/share/9ffec75b168b44008ce85c833f50a8a9">View Formal Presentation</a>
    <br />
    <br />

  </p>
</div>



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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

KarelWorlds is a tool built to help novices in computer science understand how to 'think algorithmically'. It leverages the fun of constructivist learning with the ease of access of block programming to encourage those who are new to programming to learn the basics of computational thinking.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![NextJS][NextJS]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][TailwindCSS]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Setting up and Running the Project

To run the project, follow the instructions below:

### Prerequisites

Make sure npm is installed
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/dalbanhi/karel-worlds.git
   ```

2. checkout the v0-production branch and install NPM packages
   ```sh
   npm install
   ```
3. Create a new file named  `.env` in the root of your project and add the following contents. Replace the values with your own (this will necessitate setting up a MongoDB database and a Google OAuth2.0 API key and secret). For more information on setting up a MongoDB database, see [MongoDB](https://www.mongodb.com/). For more information on setting up a Google OAuth2.0 API key and secret, see [Google Developers](https://developers.google.com/identity/protocols/oauth2). For more information about setting up NextAuth.js, see [NextAuth.js](https://next-auth.js.org/).

If you just want to see the project in action, you can just go to the [Karel Worlds Deployment](https://karel-worlds.vercel.app/).
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_URL_INTERNAL=http://localhost:3000
    NEXTAUTH_SECRET=
    GOOGLE_ID=
    GOOGLE_CLIENT_SECRET=
    MONGODB_URI=
    ```

4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000/`
6. Check out the example pages:
 -  `http://localhost:3000/` - Home page
 -  `http://localhost:3000/puzzle-creator` - Puzzle Creator page
 -  `http://localhost:3000/puzzle/662d4ab0de5f8685952594eb` - An example puzzle page
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Live Demo Video link: [KarelWorlds Demo](https://www.loom.com/share/9ffec75b168b44008ce85c833f50a8a9)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
- app/ - contains the main application code
    - api/ - contains the API routes
    - puzzles/ - contains the view of all puzzles
    - puzzle/[id] - contains the view of a single puzzle
    - puzzle-creator/ - contains the view of the puzzle creator
- components/ - contains the reusable components
    - PixiJS/ - contains the PixiJS components
    - PuzzleCreatorPage/ - contains the PuzzleCreator components
    - PuzzleSolverPage/ - contains the PuzzleSolver components
    - Puzzles/ - contains the Puzzles components
    - Nav.jsx - contains the navigation bar
    - Provider.jsx - contains the context provider





<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

David Alban Hidalgo - dalbanhi@gmail.com

Project Link: [https://github.com/dalbanhi/karel-worlds/tree/v0-production](https://github.com/dalbanhi/karel-worlds/tree/v0-production)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/dalbanhi/bibbl.io.svg?style=for-the-badge
[license-url]: https://github.com/dalbanhi/bibbl.io/blob/main/LICENSE.txt
<!-- [] -->
[NextJS]: https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/