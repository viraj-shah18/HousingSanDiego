from django.shortcuts import render

from django.http import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.decorators import api_view

# import viewsets
from rest_framework import viewsets
  
# import local data
from .models import User, Property
from .serializers import UserSerializer, PropertySerializer
from .models import *


import json
import logging
logger = logging.getLogger('django')
# To use the debugger when a server is running: logger.debug("blah")
# When using the python shell to test, just use: print("blah")

from bson.objectid import ObjectId


# /api/user 
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET': # TESTED
        users = User.objects.all()
        
        user_serializer = UserSerializer(users, many=True)
        return JsonResponse({"list" : user_serializer.data})
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST': # TESTED
        user_data = request.data # JSONParser().parse(request) #didn't work      
        user_serializer = UserSerializer(data=user_data)
        
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 

        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# api/user/<str:id>
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    # find user by id
    try: 
        user = User.objects.get(pk=ObjectId(id)) 
    except User.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # TESTED
        user_serializer = UserSerializer(user) 
        return JsonResponse(user_serializer.data) 

    elif request.method == 'PUT': # TESTED
        user_data = request.data
        user_serializer = UserSerializer(user, data=user_data) 

        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data) 

        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': # TESTED
        user.delete() 
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


# Property Endpoints ===================================

# api/property
@api_view(['GET'])
def property_list(request):
    if request.method == 'GET': # TESTED
        property_objs = Property.objects.all()
        property_serializer = PropertySerializer(property_objs, many=True)  
        return JsonResponse(property_serializer.data, safe=False)   

# api/property/id/<str:id>
@api_view(['GET'])
def property_detail(request, id):
    # find property by id
    try: 
        property_obj = Property.objects.get(pk=ObjectId(id)) 
    except Property.DoesNotExist: 
        return JsonResponse({'message': 'The Property does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # TESTED
        property_serializer = PropertySerializer(property_obj) 
        return JsonResponse(property_serializer.data) 

from geopy.geocoders import Nominatim
from geopy.distance import geodesic
geolocator = Nominatim(user_agent="HousingApp", timeout=3)

# api/property/search/<str:search_query>
@api_view(['GET'])
def property_search(request, search_query):
    # find closest properties (in sorted order) by search_query str

    if request.method == 'GET': # TESTED
        property_objs = Property.objects.all()
        property_serializer = PropertySerializer(property_objs, many=True)  

        location = geolocator.geocode(search_query.replace("_", " ")) 
        coords = (location.latitude, location.longitude)

        print("Parsed Address:")
        print(location.address)
        print(coords)

        property_mile_list = [] # contains objs that look like { property: {property model}, Miles: 0 }

        # For each property in the DB, calculate geodesic distance between the search_query and property
        for property_dict in property_serializer.data:
            miles = geodesic(coords, (property_dict["latitude"], property_dict["longitude"])).miles
            property_mile_list.append({ "property" : property_dict, "miles" : miles})

        # Sort properties by distance, ascending
        property_mile_list.sort(key=lambda property_mile: property_mile["miles"])

        # Return a JSON list of objects, each obj has field property and miles
        return JsonResponse({"list" : property_mile_list})   
        



# https://pypi.org/project/geopy/ geolocator
# https://stackoverflow.com/questions/52048692/how-to-find-closest-locations-for-a-list-of-locations-in-more-efficient-way 