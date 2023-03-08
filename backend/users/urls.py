from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from users import views


# specify URL Path for rest_framework
urlpatterns = [
    path(r'api/user/<str:id>/', views.user_detail, name='user_by_id'),
    path(r'api/user/', views.user_list, name='all_users'), 
    path("profile/", views.profile, name = 'profile_url'),
]

