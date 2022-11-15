#!/bin/bash

#migrations
source env/bin/activate
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --no-input
# restart all services 
systemctl restart nginx
systemctl restart gunicorn
