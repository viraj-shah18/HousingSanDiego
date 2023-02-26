from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path("welcome/", views.postsign, name='home-page' ),
]