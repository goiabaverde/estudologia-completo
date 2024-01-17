from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("registrar", views.register, name="register"),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('sobre', views.about_me, name="about_me"),
    path('cursos', views.courses, name='courses'),
    path('cursos/<str:course_url>', views.course, name='course'),
    path('cursos/atualizar/<int:id>', views.updateCourse, name='update_course'),
    path('cursos/pesquisar/categoria/<str:category>/<str:local>', views.search_by_category , name='search'),
]
