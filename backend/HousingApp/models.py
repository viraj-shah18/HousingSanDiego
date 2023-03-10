from djongo import models
#from django.db.models import ImageField, ManyToManyField
from django.contrib.auth.models import User
#from django.db import models


class Property(models.Model):
	name: str = models.CharField(max_length=32)
	cost: str = models.CharField(max_length=20)
	address: str = models.EmbeddedField(model_container=Address)
	latitude: float = models.DecimalField(decimal_places=15, max_digits=20)
	longitude: float = models.DecimalField(decimal_places=15, max_digits=20)
	num_bedrooms: int = models.PositiveIntegerField()
	num_bathrooms: int = models.PositiveIntegerField()

	street_address: str = models.CharField(max_length=30)
	secondary_street_address: str = models.CharField(max_length=30, blank=True, null=True)
	city: str = models.CharField(max_length=20)
	state: str = models.CharField(max_length=2)
	zipcode: int = models.PositiveIntegerField()
	
	img_id: str = models.CharField(max_length=100)

	desc: str = models.CharField(max_length=1000)

	phone: int = models.PositiveIntegerField(max_length=12, blank=True, null=True)
	email: str = models.CharField(max_length=30, blank=True, null=True)
	website: str = models.CharField(max_length=200, blank=True, null=True)	
	# https://medium.com/@tech-learner/upload-images-in-database-using-django-dc652941122b
	#images = models.ArrayField(ImageField(upload_to='images/', default=None))

class CollectionList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    collections = models.ManyToManyField(Collection, blank=True, related_name="collections")

class Collection(models.Model):
	collection_list_ref = models.OneToOneField(CollectionList, on_delete=models.CASCADE)
	name: str = models.CharField(max_length=32)
	desc: str = models.CharField(max_length=120, blank=True, null=True)
    properties = models.ManyToManyField(Property, blank=True, related_name="properties")

	

	
	




	
