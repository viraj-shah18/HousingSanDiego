from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
import pyrebase

config = {
    'apiKey': "AIzaSyDyAVtOibBqkrqJxi3tfdkEa73UufU1wHc",
    'authDomain': "housingsd-5c25b.firebaseapp.com",
    'projectId': "housingsd-5c25b",
    'storageBucket': "housingsd-5c25b.appspot.com",
    'messagingSenderId': "1050031820410",
    'appId': "1:1050031820410:web:9f4d684b0e43a5d25075c3",
    'measurementId': "G-WBBG2ZNS4X",
    "databaseURL" : ""
};

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

# posts = [
#     {
#         'author': 'Pooja',
#         'title': 'Apartment for lease',
#         'description': '2 bed, 2 bath',
#         'date_posted': 'Feb 21, 2023'
#     },
#     {
#         'author': 'Sam',
#         'title': 'House for rent',
#         'description': '2 bed, 1 bath',
#         'date_posted': 'Feb 21, 2023'
#     }
# ]

# Create your views here.
def postsign(request):
    #create a view
    context = {
        'posts': Post.objects.all()#posts
    }
    #
    return render(request, 'sd/welcome.html', context)
    #map to a url

class PostListView(ListView):
    model = Post
    template_name = 'sd/welcome.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']

class PostDetailView(DetailView):
    model = Post

class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'description']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'description']
    #will use same template as create
    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/sd'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False
