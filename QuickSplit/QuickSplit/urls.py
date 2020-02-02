"""QuickSplit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from quickstart import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('leaveGroup/<username>/<groupID>/', views.leaveGroup),
    path('signIn/<username>/<password>/', views.signIn),
    path('signUp/<username>/<password>/', views.signUp),
    path('createGroup/<username>/<groupName>/', views.createGroup),
    path('joinGroup/<username>/<groupID>/', views.joinGroup),
    path('getGroupNames/<username>/', views.getGroupNames),
    path('addItem/<username>/<groupID>/<itemName>/', views.addItem),
    path('deleteItem/<groupID>/<itemName>/', views.deleteItem),
    path('getItems/<groupID>/', views.getItems),
    path('DEBUG_resetUserPassCollection/', views.DEBUG_resetUserPassCollection),


    


    
]
