from djongo import models
from django.db.models import ImageField
#from django.db import models


# Sub-models =======================================
class Profile_Info(models.Model):
	# intro, major/college/year, clubs/extracurriculars, hobbies, living preferences, anything else?
	intro: str = models.CharField(max_length=280, blank=True, null=True)
	clubs: str = models.CharField(max_length=120, blank=True, null=True)
	hobbies: str = models.CharField(max_length=120, blank=True, null=True)
	prefs: str = models.CharField(max_length=280, blank=True, null=True)
	more: str = models.CharField(max_length=120, blank=True, null=True)
	class Meta:
		abstract = True  # Set abstract=True to prevent this model from being created as a separate collection in MongoDB.

class Social_Info(models.Model):
	phone: int = models.PositiveIntegerField(max_length=12, blank=True, null=True)
	email: str = models.CharField(max_length=30, blank=True, null=True)
	insta: str = models.CharField(max_length=30, blank=True, null=True)
	whatsapp: int = models.PositiveIntegerField(max_length=12, blank=True, null=True)

	class Meta:
		abstract = True

class Friend(models.Model):
	friend_id = models.ObjectIdField() # foreign key
	STATUS_CHOICES = (
		('P', 'Pending'),
		('R', 'Requested'),
		('F', 'Friends'),
	)
	status = models.CharField(max_length=1, choices=STATUS_CHOICES)

	@property
	def friend_ref(self):
		return User.objects.get(id=self.friend_id)

	class Meta:
		abstract = True

class Address(models.Model):
	street_address: str = models.CharField(max_length=30)
	secondary_street_address: str = models.CharField(max_length=30, blank=True, null=True)
	city: str = models.CharField(max_length=20)
	state: str = models.CharField(max_length=2)
	zipcode: int = models.PositiveIntegerField()

	class Meta:
		abstract = True

class Collection_Object(models.Model):
	property_id = models.ObjectIdField() # foreign key
	desc: str = models.CharField(max_length=120, blank=True, null=True)

	@property
	def property_ref(self):
		return Property.objects.get(id=self.property_id)

	class Meta:
		abstract = True
# End Sub-models =======================================


class Collection(models.Model):
	_id: str = models.ObjectIdField(primary_key=True)
	name: str = models.CharField(max_length=32)
	desc: str = models.CharField(max_length=120, blank=True, null=True)
	properties_list = models.EmbeddedField(model_container=Collection_Object, blank=True, null=True)
	
class User(models.Model):
	_id: str = models.ObjectIdField(primary_key=True)
	display_name: str = models.CharField(max_length=32)
	is_profile_displayed = models.BooleanField()
	profile_info = models.EmbeddedField(model_container=Profile_Info, blank=True, null=True)
	social_info = models.EmbeddedField(model_container=Social_Info, blank=True, null=True)

	# friends = models.ArrayField(
	# 	model_container=Friend, # sub doc
	# 	blank=True, 
    #     null=True,
	# 	default=list()
    # )
	# collections =  models.ArrayField(
    #     model_container=Collection, # foreign key
    #     blank=True,
	# 	null=True,
	# 	default=list()
    # )
	
class Property(models.Model):
	_id: str = models.ObjectIdField(primary_key=True)
	name: str = models.CharField(max_length=32)
	cost: str = models.CharField(max_length=20)
	address: str = models.EmbeddedField(model_container=Address)
	latitude: float = models.DecimalField(decimal_places=15, max_digits=20)
	longitude: float = models.DecimalField(decimal_places=15, max_digits=20)
	num_bedrooms: int = models.PositiveIntegerField()
	num_bathrooms: int = models.PositiveIntegerField()

	desc: str = models.CharField(max_length=1000)
	contact_info = models.EmbeddedField(model_container=Social_Info)
	# https://medium.com/@tech-learner/upload-images-in-database-using-django-dc652941122b
	#images = models.ArrayField(ImageField(upload_to='images/', default=None))
	
	




	
