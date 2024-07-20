# TRNC HOME SPOTTER SYSTEM

  _This system aims to create a real estate web application for the TRNC(Turkish Republic of  Northern Cyprus)_

## <a name="introduction">:star2: Introduction</a>

This is a Real estate web apllication designed to ease the property search process for users. It highlights the effective use of MERN stack, still working on private chat with the landlord.

## <a name="video">:movie_camera: Video (file had to clipped as it was too large) </a>

https://github.com/user-attachments/assets/1222c2af-5305-46dd-9fa0-49e4c9d0a93e

https://github.com/user-attachments/assets/aaf13297-c6a1-424b-ac08-6e41314d2052

https://github.com/user-attachments/assets/a7e42c8b-2375-4cf4-809f-00d3ea423b1e

https://github.com/user-attachments/assets/5cd7c783-08d6-4af5-b430-eaba15f8d27f


## <a name="tech-stack">:gear: Tech Stack</a>

- MongoDB
- Express.js
- React.js
- Node.js
- Firebase
- Insomnia
- Vite
- Tailwind CSS

## <a name="features">:star_struck: Features</a>
## <a name="what-i-learnt">:nerd_face: What I learnt</a>

👉 **Elegantly Designed Search bar with Enhanced Filtering Methods**: Filter search results by sale, rent, furnished, discount, parking space etc.

👉 **Customisable Profile Section**: A profile section where you can upload properties, view property listings, edit and even delete properties with a customisable profile picture.

👉 **User Authentication**: Engage with other functionalities in the application by loggin in throught the sign-in/sign-up button, google authentication available.

👉 **Completely Responsive**: Consistent access and optimal viewing on any device with a fully responsive design that adapts to different screen sizes.

👉 **Comment Section**: A interactive section where users can engage, share insights on properties viewed and also give remarks.


## <a name="what-i-learnt">:nerd_face: What I learnt</a>
- [x] 📔 **:old_key: Advanced Authentication**: I learnt how to implement JWT, Firebase, and Google OAuth for secure and seamless user access.
- [x] 📔: **:house_with_garden: Real-world CRUD Operations**: I learnt how to Create, read, update, and delete property listings using MongoDB.
- [x] 📔: **:wink: User-friendly Features**: Learnt how to enhance the user experience with image uploads, property listing management, and more.
- [x] 📔: **:rocket: Advanced Search Functionality**: I learnt how to apply cutting-edge search features to help users find what they're looking for.
- [x] 📔: **:globe_with_meridians: Deployment on Render**: Also learnt how to deploy MERN Stack on the 'render' platform.



## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
https://github.com/gmells/trnc-home-spotter-system.git
cd trnc-home-spotter-system
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev


# COMMIT INFORMATION
Created a project structure/tree defining the project structure by reorganizing directories to include separate folders for components, pages, and services.


# Project structure

```bash
./
 TRNC Home Spotter Project Structure
|-- api
|   |-- controllers
|   |   |-- auth.controller.js
|   |   |-- chat.controller.js
|   |   |-- comment.controller.js
|   |   |-- message.controller.js
|   |   |-- property.controller.js
|   |   |-- user.controller.js
|   |-- models
|   |   |-- chat.model.js
|   |   |-- comment.model.js
|   |   |-- message.model.js
|   |   |-- property.model.js
|   |   |-- user.model.js
|   |-- routes
|   |   |-- auth.route.js
|   |   |-- chat.route.js
|   |   |-- comment.route.js
|   |   |-- message.route.js
|   |   |-- property.route.js
|   |   |-- user.route.js
|   |   |-- redux
|   |-- utility
|   |   |-- error.js
|   |   |-- verification.js
|   |-- index.js
|-- client
|   |-- src
|   |   |-- assets
|   |   |   |-- images
|   |   |   |   |-- home.png
|   |   |-- components
|   |   |   |-- Comments.jsx
|   |   |   |-- Contacts.jsx
|   |   |   |-- Header.jsx
|   |   |   |-- Logo.jsx
|   |   |   |-- OAuth.jsx
|   |   |   |-- Privacy.jsx
|   |   |   |-- PropertyCard.jsx
|   |   |-- pages
|   |   |   |-- About.jsx
|   |   |   |-- CreateProperty.jsx
|   |   |   |-- Home.jsx
|   |   |   |-- Profile.jsx
|   |   |   |-- Property.jsx
|   |   |   |-- Search.jsx
|   |   |   |-- SignIn.jsx
|   |   |   |-- SignUp.jsx
|   |   |   |-- UpdateProperty.jsx
|   |   |   |-- ViewChat.jsx
|   |   |-- redux
|   |   |   |-- user
|   |   |   |   |-- userSlice.js
|   |   |   |-- store.js
|   |   |-- App.js
|   |   |-- firebase.js
|   |   |-- index.css
|   |   |-- main.jsx
|   |-- .eslintrc.cjs
|   |-- .gitignore
|   |-- README.md
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   |-- vite.config.js
|-- documents
|   |-- gradiiposter.pdf
|   |--graduationproject2_201402373 doc.docx
|-- .gitignore
|-- README.md
|-- package-lock.json
|-- package.json



```
