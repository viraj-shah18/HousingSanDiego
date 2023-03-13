from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from HousingApp import views
# from HousingApp.views import PropertySearch

# specify URL Path for rest_framework
urlpatterns = [
    # path('', include(router.urls)),
    path(r'api/property/id/<str:id>', views.property_detail),  
    path(r'api/property', views.property_list, name='properties_list'),
    #path(r'api/property/search/<str:search_query>', views.property_search),
    path(r'api/property/search/<str:search_query>', views.PropertySearch.as_view()),

    path(r'api/user_collection/<str:user_id>', views.user_collection_edit),
    path(r'api/collection/<str:collection_id>', views.collection_detail)
]