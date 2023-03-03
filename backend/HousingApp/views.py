from django.shortcuts import render

from django.http import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

# import viewsets
from rest_framework import viewsets
  
# import local data
from .models import User
from .serializers import UserSerializer
from .models import *

import logging
logger = logging.getLogger('django')

from bson.objectid import ObjectId


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        
        user_serializer = UserSerializer(users, many=True)
        return JsonResponse(user_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 

        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DEL'])
def user_detail(request, id):
    # find user by id
    try: 
        user = User.objects.get(pk=ObjectId(id)) 
    except User.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        user_serializer = UserSerializer(user) 
        return JsonResponse(user_serializer.data) 

    elif request.method == 'PUT': # not tested
        user_data = JSONParser().parse(request) 
        user_serializer = UserSerializer(user, data=user_data) 
        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data) 
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': # not tested
        user.delete() 
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)







# create a viewset
# class UserViewSet(viewsets.ModelViewSet):
#     # define queryset
#     queryset = User.objects.all()
      
#     # specify serializer to be used
#     serializer_class = UserSerializer




# https://pypi.org/project/geopy/ geolocator
# https://stackoverflow.com/questions/52048692/how-to-find-closest-locations-for-a-list-of-locations-in-more-efficient-way 