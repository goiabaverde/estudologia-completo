from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.core.paginator import Paginator
from .models import *
import json
from datetime import date
from .forms import RegisterForm, LoginForm
from home.models import *

# Create your views here.
def home(request):
    return render(request,"home\home.html", {})

def login_view(request):
    if request.method == "POST":
       form = LoginForm(request.POST)
       if form.is_valid():
           #get the data
           username = form.cleaned_data["username"]
           password = form.cleaned_data['password']
           user = authenticate(request, username=username, password=password)
           if user is not None:
               print("LOGA")
               login(request, user)
               return HttpResponseRedirect(reverse("home"))
           else:
                print("Nao loga")
                return render(request, "home/login.html", {
                "msg": "Invalid username and/or password.", 'form' : form
            })
               
    else:
        return render(request, 'home\login.html', {'form' : LoginForm})
       

def logout_view(request):
    try:
        logout(request)
        del request.session[request.user.id]
    except KeyError:
        pass
    return HttpResponseRedirect(reverse("login"))
   


def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            confirm_password = form.cleaned_data['confirm_password']
            if(password != confirm_password):
                return render(request, "home/register.html", {'form' : form  ,
                "msg": "Passwords must match."
            })
            
            try:
                user = User.objects.create_user(username, email, password)
                user.save()
                login(request,user)
                new_inventory = Inventory(user = user)
                new_inventory.save()
            except IntegrityError:
                return render(request, "home/register.html", { 'msg' : 'Username and/or email are already registered try another.' ,'form' : RegisterForm})

            return HttpResponseRedirect(reverse('home'))
    else:
        return render(request, "home/register.html", {'form' : RegisterForm})


def about_me(request):
    return render(request, 'home/about_me.html')


def courses(request):
    global avaialble_courses_msg, my_courses_msg
    try:
        available_courses = []
        all_courses = Course.objects.all()
        courses_of_user = Inventory.objects.get(user = request.user).courses.all()
        print(courses_of_user)

#check if the uses at least one course added, because with a empty Inventory the for lopp can't be done
        if len(courses_of_user) == 0:
            available_courses = Course.objects.all()
            #message that you be used on rendering
            my_courses_msg = 'Try to add a course!'
        
#for loop to know what courses has been added by the user
        else:
         my_courses_msg = ''
         for course in all_courses:
            if course in courses_of_user:
            #if the course exists in the inventory of the user, nothing is done
                pass
            else:
                available_courses.append(course)

        if len(available_courses) == 0:
            avaialble_courses_msg = "There is no avaialble course."
        else:
            avaialble_courses_msg = ''
            

        if request.user.is_authenticated:
            print("logged")
            return render(request, 'home\courses.html', {"avaialble_courses" : available_courses, "avaialble_courses_msg" : avaialble_courses_msg , 'my_courses' : courses_of_user , 'my_courses_msg' : my_courses_msg})
    except Exception as error:
        print(error)
        print("anonimo")
        available_courses = Course.objects.all()
        return render(request, 'home\courses.html', {"avaialble_courses" : available_courses, "my_courses_msg" : "Try to add a course!" })


def course(request, course_url):
    print(course_url)
    return render(request, 'home\course_page.html',{'course' : Course.objects.get(url = course_url)})

def updateCourse(request, id):
    print(id)
    user = request.user
    object = Inventory.objects.get(user = user)
    course = Course.objects.get(id = id)
    if Course.objects.get(id = id) in Inventory.objects.get(user = user).courses.all():
        print('removing')
        object.courses.remove(Course.objects.get(id = id)) 
        object.save()
        return JsonResponse({'id' : course.id  ,'url' : course.url, 'name' : course.name, 'abstract' : course.abstract, 'link' : course.link, 'image' : course.image.url})
    else:
        print('adding')
        object.courses.add(Course.objects.get(id = id)) 
        object.save()
        return JsonResponse({'id' : course.id, 'url' : course.url, 'name' : course.name, 'abstract' : course.abstract, 'link' : course.link, 'image' : course.image.url})

def search_by_category(request, category, local):
    user = request.user
    ids = []
    object = Inventory.objects.get(user = user)
    if category == 'A':
        courses = object.courses.all()
        for course in courses:
            ids.append(course.id)
        if local == 'my':
            return JsonResponse({'ids' : ids})
        else:
            avaialble_courses = []
            my_courses = object.courses.all()
            print(my_courses)
            all_courses = Course.objects.all()
            for course in all_courses:
                if course in my_courses:
                    pass
            else:
                avaialble_courses.append(course)
                for course in avaialble_course:
                    ids.append(course.id)
            return JsonResponse({'ids' : ids})

    if local == 'my':
        courses = object.courses.filter(category = category).all()
        print(courses)
        if len(courses) == 0:
            msg = 'Não há nenhum curso nessa categoria escolhida.'
        else:
            msg = ''
            for course in courses:
                ids.append(course.id)
    else:
        avaialble_courses = []
        my_courses = object.courses.all()
        print(my_courses)
        all_courses = Course.objects.all()
        for course in all_courses:
            if course in my_courses:
                pass
            else:
                avaialble_courses.append(course)
        print("UAI")
        print(avaialble_courses)
        print(type(avaialble_courses[0]))
        search_courses = []
        for avaialble_course in avaialble_courses:
            if avaialble_course.category == category:
                search_courses.append(avaialble_course)
        print('qtd')
        print(len(search_courses))
        if len(search_courses) == 0:
            msg = 'Não há nenhum curso nessa categoria escolhida.'
        else:
            msg = ''
            for course in search_courses:
                ids.append(course.id)
    print(ids)
    return JsonResponse({'ids' : ids, 'msg' : msg})
