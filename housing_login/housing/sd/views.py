from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
import pyrebase

config = {
    'apiKey': "AIzaSyDyAVtOibBqkrqJxi3tfdkEa73UufU1wHc",
    'authDomain': "housingsd-5c25b.firebaseapp.com",
    'projectId': "housingsd-5c25b",
    'storageBucket': "housingsd-5c25b.appspot.com",
    'messagingSenderId': "1050031820410",
    'appId': "1:1050031820410:web:9f4d684b0e43a5d25075c3",
    'measurementId': "G-WBBG2ZNS4X",
    "databaseURL" : ""
};

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

posts = [
    {
        'author': 'Pooja',
        'title': 'Apartment for lease',
        'description': '2 bed, 2 bath',
        'date_posted': 'Feb 21, 2023'
    },
    {
        'author': 'Sam',
        'title': 'House for rent',
        'description': '2 bed, 1 bath',
        'date_posted': 'Feb 21, 2023'
    }
]

# Create your views here.
def postsign(request):
    #create a view
    context = {
        'posts': posts
    }
    #Post.objects.all()
    return render(request, 'sd/welcome.html', context)
    #map to a url
