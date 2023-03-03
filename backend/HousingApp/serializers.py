# import serializer from rest_framework
from rest_framework import serializers
  
# import model from models.py
from .models import *
  
# Create a model serializer 
class UserSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = User
        fields = '__all__'
        #fields = ('_id', 'display_name', 'is_profile_displayed', 'profile_info', 'social_info') # 'friends', 'collections')

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('_id', 'name', 'cost', 'address', 'latitude', 'longitude', 'desc', 'contact_info', 
                    'num_bedrooms', 'num_bathrooms')

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('_id', 'name', 'desc', 'properties_list')