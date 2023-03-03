from django.contrib import admin
from django.urls import include, path, re_path

from rest_framework import routers

  
from HousingApp import views

# define the router
#router = routers.DefaultRouter()
  
# define the router path and viewset to be used
#router.register(r'user', views.UserViewSet)

# specify URL Path for rest_framework
urlpatterns = [
    # path('', include(router.urls)),
    path(r'api/user', views.user_list),
    path(r'api/user/<str:id>', views.user_detail),
    # url(r'^api/property$', views.property_list),    
    # url(r'^api/property/id/(?P<pk>[0-9]+)$', views.property_detail),  
    # url(r'^api/property/coords/(?P<pk>[0-9]+)$/(?P<pk>[0-9]+)$', views.property_coords),    
]