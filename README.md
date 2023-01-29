# JavaScript Client - Server Model Online Shop

Full-stack JavaScript web application, which is represents online shop with client-sever model.  
Backend part is realised by Express.js in integration with PostgreSQL. Database is connected to server by Sequelize.  
Fronted part is realised by React with MobX. App components and stylesheets are imported from React Bootstrap Framework.  
Authorization on the site uses JWT technology.

The application includes:
* Backend part with controllers and routers for HTTP
* Sequelize models instances and associations
* Methods handled file uploading and static data management
* Custom middleware and error handling

* Frontend part with private and public routes for react router
* MobX state store
* React, react-router hooks
* React Bootstrap components
* Axios inctances and requests

The application is designed based on [Ulbi TV](https://www.youtube.com/@UlbiTV) video tutorials.

## Stack

### Backend
* `Express` v4
* `PostgreSQL` as DBMS
* `Sequelize` as ORM
* `CORS` for providing cross-domain requests
* `JWT` for securely transmitting information

### Frontend

* `React` v18
* `React Router` v6 for various routes defining
* `Axios` for HTTP requests
* `MobX` as state manager
* `Bootstrap` for responsive web designed components
* `JWT` for securely transmitting information

## Learn More

*npm run dev* command starts server part  
*npm start* command starts client part
