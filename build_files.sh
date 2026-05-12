#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Run migrations against the production database
python manage.py migrate --noinput
