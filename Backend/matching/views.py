from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    random_variable = 1
    second_variable = 2
    return render(request, 'hello.html', {'name': 'Primordial'})