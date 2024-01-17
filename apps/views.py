from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse
from home.models import *
from .models import *
import datetime
import json
# Create your views here.

def hub(request):
    return render(request, 'apps/hub.html', {})

def determinant_calc(request):
    if request.method == 'POST':
        pass
    else:
        return render(request, 'apps/determinant_calc.html')
    
def product_calc(request):
    return render(request, 'apps/product_calc.html')
    
def binomial(request):
    if request.method == 'POST':
        pass
    else:
        return render(request, 'apps/binomial.html')
    
def pascal(request):
    if request.method == 'POST':
        pass
    else:
        return render(request, 'apps/pascal.html')
    
def pa(request):
    if request.method == 'POST':
        print('POST')
        return HttpResponse("Text only, please.")
        pass
    else:
        return render(request, 'apps/pa.html', {})
    
def pg(request):
    if request.method == 'POST':
        pass
    else:
        return render(request, 'apps/pg.html')
    
def add_element(request):
    if request.method == 'POST':
    #Get the data
        if(request.user.is_authenticated):
        
            print('POST')
            print(request)
            data = json.loads(request.body)
            try:
                var2= data['var2']
            except:
                var2 = None
            print(data['type'])
            print(type(data['var1']))
            print(float(data['var1']))
            print()
        #Create a new object to db and save
            object = Historic(user = request.user, type_app = data['type'],  var1 = float(data['var1']), var2= var2, date = datetime.datetime.now())
            object.save()
            pass
        else:
            return render(request, 'apps/error.html', {'msg' : 'Você precisa estar logado para acessar o histórico das calculadoras.'})

def add_matrix(request):
     if request.method == 'POST':
    #Get the data
        
        print('POST')
        print(request)
        print("WHY")
        if(request.user.is_authenticated):
            try:
                data = json.loads(request.body)
                print(data)
                # if is determiant will store like determinant matrix
                if data['cond']:
                    print("DET")
                    object = MatricesHistoric(user = request.user, determinant = data['cond'] ,number_rows_a = data['n_row'], number_colunms_a = data['n_co'], matrix_a = data['matrix'], date = datetime.datetime.now())
                    object.save()    
                else:
                    print("NOT DETERMINANT")
                    object = MatricesHistoric(user = request.user, determinant = False ,number_rows_a = data['number_rows_a'], number_colunms_a = data['number_colunms_a'], matrix_a = data['matrix_a'], number_rows_b = data['number_rows_b']  ,number_colunms_b = data['number_colunms_b'], matrix_b = data['matrix_b'], date = datetime.datetime.now())
                    object.save()  
            except Exception as e:
                print(e)
                return render(request, 'apps/error.html', {'msg' : "You are trying to store a matrix that's not a matrix to calculate the determinant as a determinant matrix."})
        else:
            return render(request, 'apps/error.html', {'msg' : 'Você precisa estar logado para acessar o histórico das matrizes.'})

def add_function(request):
    if(request.user.is_authenticated):
        data = json.loads(request.body)
        object = FunctionHistoric(user = request.user, function = data['function'], date = datetime.datetime.now())
        object.save()
        pass
    else:
        return render(request, 'apps/error.html',{"msg" : 'Você precisa estar logado para acessar o histórico das funções.'})


def historic_hub(request):
    return render(request, 'apps/hub_historical.html')

def historic_matrices(request):
    if(request.user.is_authenticated):
        itens = MatricesHistoric.objects.filter(user = request.user).order_by('-date')
        return render(request, 'apps/matrices_historic.html', {'itens' : itens})
    else:
        return HttpResponseRedirect(reverse('login'))


def historic(request):
    if(request.user.is_authenticated):
        itens = Historic.objects.filter(user = request.user).order_by("-date")
        print(itens)
        return render(request, 'apps/historic.html', {'itens' : itens})
    else:
        return HttpResponseRedirect(reverse('login'))
    

def historic_functions(request):
    if(request.user.is_authenticated):
        itens = FunctionHistoric.objects.filter(user = request.user).order_by('-date')
        return render(request, 'apps/function_historic.html', {'itens' : itens})
    else:
        return HttpResponseRedirect(reverse('login'))



def edit(request, id):
    if(request.user.is_authenticated):

        print("GO")
    #Get the data that will be restored
        element = Historic.objects.get(id = id)
    #Check if the person who is trying to access this element was the person who created this element.
        if(request.user != element.user):
            return render(request,"apps/error.html", {'msg' : 'Você precisa ser a pessoa que escreveu esse elemento para edita-lo.'}) 
        type = element.type_app
        print(element.type_app)
        if(type == 'pa'):
            print("LESGO")
            return render(request, 'apps/pa.html', {'a1' : element.var1, 'r': element.var2})
        if(type == 'pg'):
            return render(request, 'apps/pg.html', {'a1' : element.var1, 'q': element.var2})
        if(type == 'ps'):
            return render(request, 'apps/pascal.html', {'row' : element.var1})
        if(type == 'bi'):
            return render(request, 'apps/binomial.html', {'coef' : element.var1 })
        if(type == 'fc'):
            return render(request, 'apps/function.html', {'function' : element.var1 })
    else:
        return render(request, 'apps/error.html', {'msg' : 'Você precisa estar logado para editar as calculadoras.'})


def edit_matrix(request, id):
    if(request.user.is_authenticated):

        element = MatricesHistoric.objects.get(id = id)
        if (request.user != element.user):
            return render(request,"apps/error.html", {'msg' : 'Você precisa ser a pessoa que escreveu essa matriz para poder edita-la.'}) 
        if element.determinant:
            print('DET')
            print(element.determinant)
            return JsonResponse({'number_rows_a' : element.number_rows_a, 'number_colunms_a' : element.number_colunms_a, 'matrix_a' : element.matrix_a, 'determinant' : element.determinant})
        else:
            print('NOT DET')
            return JsonResponse({'number_rows_a' : element.number_rows_a, 'number_colunms_a' : element.number_colunms_a, 'matrix_a' : element.matrix_a, 'number_rows_b' : element.number_rows_b, 'number_colunms_b' : element.number_colunms_b, 'matrix_b' : element.matrix_b})
    else:
        return render(request, 'apps/error.html', {'msg' : 'Você precisa estar logado para editar essa matriz.'})
    
def edit_function(request,id):
        if(request.user.is_authenticated):
            element = FunctionHistoric.objects.get(id=id)
            if(element.user != request.user):
                return render(request , 'apps/error.html', {'msg' :  'Você precisa ser a pessoa que escreveu essa função para poder edita-la.'})
            return render(request, 'apps/function.html' , {'function' : element.function})
        else:
            return render(request, 'apps/error.html', {'msg' : 'Você precisa estar logado para editar essa função'})
    

def remove_normal(request, id):
    if(request.user.is_authenticated):
        print(id)
        object = Historic.objects.get(pk = id).delete()
    else:
        return render(request, 'apps/error.html', {'msg' : "Você não pode fazer isso sem estar logado!"})

def remove_matrix(request, id):
    if(request.user.is_authenticated):
        print(id)
        object = MatricesHistoric.objects.get(pk = id)
        if(object.user != request.user):
            return render(request, 'apps/error.html', {'msg' : "Você precisa se a pessoa que escrever essa matriz para remove-la."})
        object.delete()
    else:
        return render(request, 'apps/error.html', {'msg' : "Você precisa estar logado para remover essa matriz do histórico."})
    
def remove_function(request,id):
    if(request.user.is_authenticated):
        print(id)
        object = FunctionHistoric.objects.get(pk = id)
        if(object.user != request.user):
            return render(request, 'apps/error.html', {'msg' : "Você precisa ser a pessoa que escreveu essa função para remove-la."})
        object.delete()
    else:
        return render(request, 'apps/error.html', {'msg' : "Você precisa estar logado para remover essa função do histórico."})

def function(request):
    return render(request, 'apps/function.html')