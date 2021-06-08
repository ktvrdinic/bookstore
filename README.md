# Bookstore app
This project is not made for the purpose of testing my skills.
The project has authentication and authorization functionalities, where the user can add his own book, edit book, and delete his own book. It can also search for books from other users.

## How to configure
The first thing you need to do is create a database on mongoDB or download it locally and configure it.
1. Clone repozitory to your local envirement
```
git clone https://github.com/ktvrdinic/bookstore.git
```
3. Configure [MongoDB](https://www.mongodb.com/) and fetch connection URL
4. SetUp env variables.
    1. DATABASE (Set MongoDB URI fetched from 2.)
    2. SECRET (Set Secret for your JWT token)
5. Install packages on server
```
yarn
```
5. Install packages on client (run: cd client; yarn)
```
cd client
yarn
```
6. Start your app on servert then on client (run: yarn start)
```
yarn start
cd client
yarn start
```
