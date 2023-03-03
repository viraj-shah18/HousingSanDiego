from django.urls import path
from .views import (PostListView, PostDetailView, 
                    PostCreateView, PostUpdateView, PostDeleteView)

#URLConf
urlpatterns = [
    path('', PostListView.as_view(), name='home-page'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name='post-update'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name='post-delete'),
]

#<app>/<model>_<viewtype>.html