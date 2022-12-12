<h1 align="center">Amazon Clone</h1>
<p align="center">
  Be sure to ⭐ my repo so you can keep up to date on any daily progress ! ❤
</p>
<br>
Clone of amazon with all major features ! 
<br>
Contains CRUD, advanced patterns and try to respect clean architecture. 📂
<br>
<br>
<p align="center">
  <img width="800" src="https://github.com/LionelAREL/Amazon-Clone/blob/main/amazon-clone.gif" alt=""/>
</p>

<p align="center">
  <a href="https://amazon.lionel-arel.com">👋 demo here !</a>
</p>

## Features
- [x] CRUD: create, update and remove articles
- [x] Authentication with cookie session
- [x] Admin page to manage backend
- [x] Pagination of articles
- [x] Cart gestion and separation between anonymous users and authenticated users
- [x] Differents authorizations, only admin users can access to the admin page
- [x] Manage your cart
- [x] Redirect to the Stripe payment with the details of your cart
- [x] After paiement, update the stocks


## Stack
- Angular <br>

    > angular-material 
   
    > rxjs
    
    > ngx-pagination
- Django <br>

    > django Rest Framework

    > corsheaders

    > django_filters
- Html/Css
- Postgresql


## Setup
#### Frontend
`npm install` install dependency  <br>

`npm start` run locally the project <br>
#### Backend
`python3 manage.py makemigrations` launch migrations <br>

`python3 manage.py migrate` apply migration on database <br>

`python3 manage.py runserver` run server <br>

## Creator
**Lionel AREL**
- <https://github.com/lionelAREL>
## Copyright and license
Code and documentation copyright 2021 the authors. Code released under the
[MIT License].
