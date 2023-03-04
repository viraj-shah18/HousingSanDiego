# Running the Backend

- First, activate your Python virtual env.
- Be in the top-level directory and run ```pip install -r requirements.txt```.
- ```cd backend``` 
- Run the command ```python manage.py runserver``` to run your local server.
- Navigate to ```http://localhost:8000/api/[rest of the url here]```

If changes were made to the server (for example, edits to ```models.py``` or ```settings.py```)
run these two commands before running the runserver command:
- ```python manage.py makemigrations```
- ```python manage.py migrate```

You don't need to run these commands if you only changed ```views.py```.

# Database

The database is hosted in the cloud on MongoDB Atlas. If necessary, please send me the email address used for your
MongoDB account so I can add you to the project for live GUI access via the MongoDB website.

Otherwise, the database is already connected to the Django app via the ```settings.py```. Any requests made
to a live server will have access to the remote database.

To give a server running on your machine access to the MongoDB Atlas cloud instance:
- Navigate to ```.venv/lib/pymongo/mongo_client.py```
- Edit the line of code from:
```
HOST = "localhost"
```
to:
```
HOST = 'mongodb+srv://abodegenius:sHnSgURodYwUws3U@cluster0.pjbn6j9.mongodb.net/?retryWrites=true&w=majority'
```

# Models

All of the fields of a User, Property, and Collection are defined in ```models.py```, along with
their sub-documents.

# Endpoints

All of the functionality for endpoints are implemented in ```views.py```.

All of the URLs for these endpoints can be found across the several ```urls.py``` files.

There will be three types of endpoints for our three different collections in MongoDB: User, Property, and Collection.

*NOTE* that, for security, all endpoints that receive multiple objects 
(for example, GET all users, GET closest properties) will have the structure:
```
{
	"list": [
		object1,
		object2
	]
}
```

## Endpoints for User collection

Here, I detail all of our endpoints as well as provide the Python code I tested them with. 
Please use these to help write your requests.

### url = '/api/user' [GET all users, POST one user]

#### Example GET 
```
response = client.get(url)
response.content
```

#### Example POST 
```
import json
data = {
	"_id": "d3ffd299b2d6a0131f530809",
	"display_name": "Helly",
	"is_profile_displayed": False,
	"social_info": json.dumps({
		"phone": "8581234567",
		"email": "hello@gmail.com"
	})
}
response = client.post(url, data=data)
```

### url = '/api/user/<str:id>' [By id, GET one user, PUT one user, DEL one user]

#### Example PUT request 
```
import json
url = '/api/user/d3ffd299b2d6a0131f530809'
data = {
	"_id": "d3ffd299b2d6a0131f530809",
	"display_name": "Melly",
	"is_profile_displayed": False,
	"social_info": json.dumps({
		"phone": "8581234567",
		"email": "hello@gmail.com"
	})
}
response = client.put(url, data=data, content_type='application/json')
```

#### Example DELETE request 
```
url = '/api/user/d3ffd299b2d6a0131f530809'
response = client.delete(url)
```

## Endpoints for Property collection

### url = '/api/property/id/<str:id>' [By id, GET one Property]

```
response = client.get(url)
response.content
```

### url = '/api/property' [GET all Properties]

```
response = client.get(url)
```

### url = '/api/property/search/<str:search_query>' [GET multiple most relevant Properties based on distance to search_query]

```
url = '/api/property/search/UC_San_Diego'
response = client.get(url)
```

This endpoint returns a list of objects, where each object has a "property" field and a "miles" field.
- The "property" field is an object of the already defined model in ```models.py```.
- The "miles" field is the distance in miles from ```<str:search_query>``` to the specific property.
The list is sorted by the "miles" field in ascending order.

Make sure to see the note under the top-level Endpoints section about lists in this API.

# Testing the Endpoints with Python

To test any new endpoints/views you write through the Python shell:
- Make sure you are in your Python env and the ```HousingApp/backend/``` folder.
- Run ```python manage.py shell```
- Copy paste this setup code:
```
from django.test.utils import setup_test_environment
setup_test_environment()
from django.test import Client
client = Client()
```
- Then make your request using ```client.somefunction()```. See the above Endpoints section for some code.

