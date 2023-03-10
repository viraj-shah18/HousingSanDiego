#from django.db import models
from djongo import models
from django.contrib.auth.models import User
from PIL import Image


# Sub-model
# class Social(models.Model):
#     #email is part of basic user info, so included here
# 	phone = models.PositiveIntegerField(max_length=12, blank=True, null=True)
# 	insta = models.CharField(max_length=30, blank=True, null=True)
# 	whatsapp = models.PositiveIntegerField(max_length=12, blank=True, null=True)
# 	class Meta:
# 		abstract = True

class Profile(models.Model):
	# intro, major/college/year, clubs/extracurriculars, hobbies, living preferences, anything else?
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #image = models.ImageField(default='default.png', upload_to='profile_pics/')
    intro = models.CharField(max_length=280, blank=True, null=True)
    clubs = models.CharField(max_length=120, blank=True, null=True)
    hobbies = models.CharField(max_length=120, blank=True, null=True)
    prefs = models.CharField(max_length=280, blank=True, null=True)
    more = models.CharField(max_length=120, blank=True, null=True)
    #social_info = models.EmbeddedField(model_container=Social, blank=True, null=True)
    
    phone = models.PositiveIntegerField(blank=True, null=True)
    insta = models.CharField(max_length=30, blank=True, null=True)
    whatsapp = models.PositiveIntegerField(blank=True, null=True)
    
    def __str__(self):
        return f'{self.user.username} Profile'

    # def save(self):
    #     super().save()
    #     img = Image.open(self.image.path)
    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)


# class Friend(models.Model):
# 	friend_id = models.ObjectIdField() # foreign key
# 	STATUS_CHOICES = (
# 		('P', 'Pending'),
# 		('R', 'Requested'),
# 		('F', 'Friends'),
# 	)
# 	status = models.CharField(max_length=1, choices=STATUS_CHOICES)

# 	@property
# 	def friend_ref(self):
# 		return User.objects.get(id=self.friend_id)

# 	class Meta:
# 		abstract = True

