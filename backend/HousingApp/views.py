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
from .serializers import UserSerializer, PropertySerializer, CollectionSerializer
from .models import *


import json
import logging
logger = logging.getLogger('django')
# To use the debugger when a server is running: logger.debug("blah")
# When using the python shell to test, just use: print("blah")

from bson.objectid import ObjectId

# User Endpoints ===================================

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
    
# /api/user/<str:id>
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

# /api/property
@api_view(['GET'])
def property_list(request):
    if request.method == 'GET': # TESTED
        property_objs = Property.objects.all()
        property_serializer = PropertySerializer(property_objs, many=True)  
        return JsonResponse({"list" : property_serializer.data})

# /api/property/id/<str:id>
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

# https://pypi.org/project/geopy/ geolocator
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
geolocator = Nominatim(user_agent="HousingApp")

# /api/property/search/<str:search_query>
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
        

# Collection Endpoints ===================================

# api/user_collection/<str:id>
# @api_view(['GET', 'PUT'])
# def user_collection_list(request, id):
#     # id corresponds to a user's id!!
#     # For GETting list of collections, and PUTting (add or remove collection to user's list) 
#     try: 
#         user = User.objects.get(pk=ObjectId(id)) 
#     except User.DoesNotExist: 
#         return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

#     if request.method == 'GET': # NOT TESTED
#         user_serializer = UserSerializer(user) 
#         return JsonResponse(user_serializer.data["collection"])

#     elif request.method == 'PUT': # TESTED
#         # PUT a user's list of collection ids
#         collection_id_list = request.data
#         print(user)
#         # user_serializer = UserSerializer(user, data=user_data) 

#         # if user_serializer.is_valid(): 
#         #     user_serializer.save() 
#         #     return JsonResponse(user_serializer.data) 

#         # return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# HELPER METHOD used for formatting collections json response
def convert_dict_to_dict_str(data_dict):
    clone = dict()

    for key in data_dict:
        clone[key] = str(data_dict[key])

    return clone

# /api/user_collection/<str:user_id>
@api_view(['POST', 'DELETE'])
def user_collection_edit(request, user_id):
    # Try to find the specified user
    try: 
        user = User.objects.get(pk=ObjectId(user_id)) 
    except User.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'POST': # TESTED      (without properties list)
        # Found user, now POST a new collection into the Collections mongo collection
        collection_data = request.data    
        collection_serializer = CollectionSerializer(data=collection_data)
        
        if collection_serializer.is_valid():
            collection_serializer.save()
        else:
            return JsonResponse(collection_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Collection posted, now add new collection id to user list of collections 
        # Collections data (every field except id can be outdated) saved into user.collections
        user.collections.append(collection_serializer.data)
        user.save()

        collections_clone = [convert_dict_to_dict_str(collections_data) for collections_data in user.collections]
        return JsonResponse({"list" : collections_clone}, status=status.HTTP_201_CREATED) 

    elif request.method == 'DELETE': # TESTED
        collection_data = request.data

        if "_id" not in collection_data:
            return JsonResponse({'message': 'In request body, need to specify an _id for the collection to be deleted'}, 
                                status=status.HTTP_400_BAD_REQUEST)

        try: 
            collection_obj = Collection.objects.get(pk=ObjectId(collection_data["_id"])) 
        except Collection.DoesNotExist: 
            return JsonResponse({'message': 'The Collection with this _id does not exist'}, status=status.HTTP_404_NOT_FOUND)        

        # Delete collection with id 
        collection_obj.delete() 

        # Remove collection with this id from user collection lists
        requested_collection_id = ObjectId(collection_data["_id"])
        collection_delete_index = 0
        for i, user_collection_data in enumerate(user.collections):
            if user_collection_data["_id"] == requested_collection_id:
                collection_delete_index = i
                break
        else:
            return JsonResponse({'message': 'Collection deleted in DB but was not found in User collection list'}, 
                                status=status.HTTP_404_NOT_FOUND)        

        user.collections.pop(collection_delete_index)
        user.save()
        collections_clone = [convert_dict_to_dict_str(collections_data) for collections_data in user.collections]
        return JsonResponse({"list" : collections_clone}, status=status.HTTP_201_CREATED) 

# api/collection/<str:collection_id>
@api_view(['GET', 'PUT'])
def collection_detail(request, collection_id):
    # find a single collection by id
    try: 
        collection_obj = Collection.objects.get(pk=ObjectId(collection_id)) 
    except Collection.DoesNotExist: 
        return JsonResponse({'message': 'The Collection does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # TESTED
        collection_serializer = CollectionSerializer(collection_obj) 
        return JsonResponse(collection_serializer.data) 

    # for directly editing a collection
    elif request.method == 'PUT': # NOT TESTED
        collection_data = request.data

        # TODO fjdlsakjf
        # properties_id = collection_data
        print(collection_data)
        # print(type(collection_data["properties_list"]))
        # print(collection_data["properties_list"][0])

        # try: 
        #     collection_obj = Properties.objects.get(pk=ObjectId(collection_id)) 
        # except Collection.DoesNotExist: 
        #     return JsonResponse({'message': 'The Property does not exist'}, status=status.HTTP_404_NOT_FOUND) 

        collection_serializer = CollectionSerializer(collection_obj, data=collection_data) 
        # collection_obj.properties_list.append(collection_serializer.data)
        # collections_obj.save()

        if collection_serializer.is_valid(): 
            collection_serializer.save() 
            print(collection_obj.data)
            return JsonResponse(collection_obj.data) 

        return JsonResponse(collection_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
