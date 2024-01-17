from django.urls import path
from . import views

urlpatterns = [
    path('', views.hub, name='hub'),
    path('determinant', views.determinant_calc, name='determinant'), 
    path('produto', views.product_calc, name='product'),
    path('binomial', views.binomial, name='binomial'),
    path('pascal', views.pascal, name='pascal'),
    path('pa', views.pa, name='pa'),
    path('pg', views.pg, name='pg'),
    path('add', views.add_element, name='add'),
    path("add/matriz", views.add_matrix, name='add_matrix'),
    path('add/funcao', views.add_function, name='add_function'),
    path('historico/normal', views.historic, name='historic'),
    path('historico', views.historic_hub, name = 'historic_hub'),
    path('historico/matrizes', views.historic_matrices, name='historic_matrices'),
    path('historico/funcao' , views.historic_functions, name='historic_function'),
    path('editar/<int:id>', views.edit, name='edit'),
    path('editar/matriz/<int:id>', views.edit_matrix, name='edit_matrix'),
    path('editar/funcao/<int:id>', views.edit_function, name='edit_function'),
    path('remover/<int:id>', views.remove_normal, name='remove_normal'),
    path('remover/matriz/<int:id>', views.remove_matrix, name='remove_matrix'),
    path('remover/funcao/<int:id>', views.remove_function, name='remove_function'),
    path('funcao', views.function, name='function')
]