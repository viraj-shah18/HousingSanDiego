# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, UserUpdateSerializer#, SocialInfoSerializer
from rest_framework.permissions import AllowAny
from .models import User
from django.contrib import messages
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from bson.objectid import ObjectId
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, format='json'):
        serializer = CustomUserSerializer()
        return JsonResponse(serializer.data)



# /api/user
@api_view(['GET'])
def user_list(request):
    if request.method == 'GET': # TESTED
        users = User.objects.all() # get all users
        user_serializer = UserUpdateSerializer(users, many=True)
        # image_64 = user_serializer.data.image
        # try:
        #     with open(image_64, 'rb') as f:
        #         image_64 = base64.b64encode(f.read())
        # except:
        #     return JsonResponse({'message': 'Error encoding file'}, status=status.HTTP_404_NOT_FOUND)    
        # user_serializer.data.image
        return JsonResponse({"list" : user_serializer.data})
    return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def profile(request):
    #find user by id
    try: 
        user_exists = User.objects.get(pk=request.user.id)
    except User.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # TESTED
        user_serializer = UserUpdateSerializer(user_exists) 
        return JsonResponse(user_serializer.data)

    elif request.method == 'PUT': # TESTED
        user_serializer = UserUpdateSerializer(user_exists, data = request.data) 
        permission_classes = (IsAuthenticated,)
        if user_serializer.is_valid(): 
            user_serializer.save() 
            messages.success(request, f'Account has been updated')
            return JsonResponse(user_serializer.data)
        else:
            return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': #TESTED
        user_exists.delete() 
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


# api/user/<str:id>
@api_view(['GET'])
def user_detail(request, id):
    # find user by id
    try: 
        user = User.objects.get(pk=id) 
    except User.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': # TESTED
        user_serializer = UserUpdateSerializer(user) 
        return JsonResponse(user_serializer.data) 