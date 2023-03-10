# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import *
  

# class SocialInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Social_Info
#         fields = '__all__'
#         abstract = True
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         #social_info = SocialInfoSerializer(many=True)
#         #fields = '__all__'
#         fields = ('_id', 'display_name', 'is_profile_displayed', 'profile_info', 'social_info') # 'friends', 'collections')

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        # fields = ('_id', 'name', 'cost', 'address', 'latitude', 'longitude', 'desc', 'contact_info', 
        #             'num_bedrooms', 'num_bathrooms')

class PropertyIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyId
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    properties_list = serializers.ListField(child=PropertyIdSerializer())

    class Meta:
        model = Collection
        fields = '__all__'
        # fields = ('_id', 'name', 'desc', 'properties_list')