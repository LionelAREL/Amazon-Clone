#!/bin/bash

# restart all services 
systemctl restart nginx
systemctl restart gunicorn
