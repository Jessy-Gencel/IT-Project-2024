from django.urls import path
from . import views

# The URL patterns for the matching app
urlpatterns = [
    path('hello/', views.say_hello),
]