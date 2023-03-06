# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from .models import User

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from bson.objectid import ObjectId

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

# /api/user 
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET': # TESTED
        users = User.objects.all()
        
        user_serializer = CustomUserSerializer(users, many=True)
        return JsonResponse({"list" : user_serializer.data})
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST': # TESTED
        user_data = request.data # JSONParser().parse(request) #didn't work      
        user_serializer = CustomUserSerializer(data=user_data)
        
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
        user_serializer = CustomUserSerializer(user) 
        return JsonResponse(user_serializer.data) 

    elif request.method == 'PUT': # TESTED
        user_data = request.data
        user_serializer = CustomUserSerializer(user, data=user_data) 

        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data) 

        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': # TESTED
        user.delete() 
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

