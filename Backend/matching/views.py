from django.shortcuts import render
from django.http import JsonResponse
from .models import get_user

def hello(request):
    users = get_user()
    return JsonResponse(users, safe=False)