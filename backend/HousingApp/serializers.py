# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import *
  

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        # fields = ('_id', 'name', 'cost', 'address', 'latitude', 'longitude', 'desc', 'contact_info', 
        #             'num_bedrooms', 'num_bathrooms')

class CollectionListSerializer(serializers.ModelSerializer):
    collections = CollectionSerializer(read_only=True, many=True)
    class Meta:
        model = CollectionList
        fields = ('user', 'collections',)

class CollectionSerializer(serializers.ModelSerializer):
    """
    A serializer for our a single Collection object (a list of properties)
    """
    properties = PropertySerializer(read_only=True, many=True)
    class Meta:
        model = Collection
        fields = ('collection_list_ref', 'name', 'desc', 'properties',)





