from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile#, Social
from .serializers import CollectionListSerializer

#from drf_extra_fields.fields import Base64ImageField
from drf_writable_nested import WritableNestedModelSerializer

class ProfileSerializer(serializers.ModelSerializer):
    """
    A serializer for our user profile obejct
    """
    #image = Base64ImageField(required=False)
    class Meta:
        model = Profile
        #what feilds we want to take from the Profile_Info model
        #'image',  
        fields = ('intro', 'clubs', 'hobbies', 'prefs', 'more', 'phone', 'insta', 'whatsapp')

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # def update(self, instance, validated_data):
    #         userprofile_serializer = self.fields['profile']
    #         userprofile_instance = instance.profile
    #         userprofile_data = validated_data.pop('profile', {})

    #         # to access the UserProfile fields in here
    #         # mobile = userprofile_data.get('mobile')

    #         # update the userprofile fields
    #         userprofile_serializer.update(userprofile_instance, userprofile_data)
    #         instance = super().update(instance, validated_data)
    #         return instance
        
class UserUpdateSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    profile = ProfileSerializer(required=False, many=False)
    collection_list = CollectionListSerializer(required=False, many=False)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'profile',)