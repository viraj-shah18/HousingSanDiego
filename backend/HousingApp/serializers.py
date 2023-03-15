# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import *
  

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    """
    A serializer for our a single Collection object (a list of properties)
    """
    properties = PropertySerializer(read_only=True, many=True)

    class Meta:
        model = Collection
        fields = ('_id', 'name', 'desc', 'properties',)

class CollectionListSerializer(serializers.ModelSerializer):
    collections = CollectionSerializer(read_only=True, many=True)
    class Meta:
        model = CollectionList
        fields = ('user', 'collections',)







