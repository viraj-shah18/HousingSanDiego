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

from bson.objectid import ObjectId


# /api/user 
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET': # TESTED
        users = User.objects.all()
        
        user_serializer = UserSerializer(users, many=True)
        return JsonResponse(user_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST': # TESTED
        print(request.data)
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


# api/property/id/<str:id>
@api_view(['GET'])
def property_detail(request, id):
    # find property by id
    try: 
        property_obj = Property.objects.get(pk=ObjectId(id)) 
    except Property.DoesNotExist: 
        return JsonResponse({'message': 'The Property does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # NOT TESTED
        property_serializer = PropertySerializer(property_obj) 
        return JsonResponse(property_serializer.data) 

# api/property/search/<str:search_query>
@api_view(['GET'])
def property_search(request, search_query):
    # find closest properties (in sorted order) by search_query str
    # NOT YET IMPLEMENTED
    try: 
        property_obj = Property.objects.get(pk=ObjectId(search_query)) 
    except Property.DoesNotExist: 
        return JsonResponse({'message': 'The Property does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # NOT TESTED
        property_serializer = PropertySerializer(property_obj) 
        return JsonResponse(property_serializer.data) 





# create a viewset
# class UserViewSet(viewsets.ModelViewSet):
#     # define queryset
#     queryset = User.objects.all()
      
#     # specify serializer to be used
#     serializer_class = UserSerializer


# https://pypi.org/project/geopy/ geolocator
# https://stackoverflow.com/questions/52048692/how-to-find-closest-locations-for-a-list-of-locations-in-more-efficient-way 