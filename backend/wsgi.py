import os
import sys

# 1. Add the project root directory to the Python path so Vercel can find the 'lorraines' app
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# 2. Boot up Django
application = get_wsgi_application()

# 3. Vercel's serverless builder specifically looks for an 'app' variable!
app = application