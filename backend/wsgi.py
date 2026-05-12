import os
import sys

# Add the project root directory to the Python path so Vercel can find the 'lorraines' app
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.insert(0, path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application

# Boot up Django
application = get_wsgi_application()

# Vercel's serverless builder specifically looks for an 'app' variable!
app = application