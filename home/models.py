from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass
    def __str__(self):
        return f"{self.username}"
    
class Course(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=90, default='http://127.0.0.1:8000/')
    abstract = models.TextField()
    content = models.TextField()
    link = models.TextField()
    image = models.ImageField(default="course_image.png")
    CATEGORY_CHOICES =(('M', 'Matemática'),('L', 'Linguagens'),('N', 'Ciências da Natureza'), ('H','Ciências Humanas'))
    category = models.CharField(max_length=1 ,choices = CATEGORY_CHOICES , default='A')

    def __str__(self):
        return f"{self.name}"

class Inventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, blank=True)
    def __str__(self):    
        return f"{self.user}"
    
class Historic(models.Model):
    APPS_CHOICES = (('pa', 'PA'), ('pg', 'PG'),('ps', 'Pascal'), ('bi', "Binômio de Newton"))
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type_app = models.CharField(max_length = 2, choices= APPS_CHOICES)
    var1 = models.FloatField(blank = True, null = True)
    var2 = models.FloatField(blank = True, null = True)
    date = models.DateTimeField(blank = True, null = True)

    def __str__(self):
        return f"{self.user}: {self.type_app} - var1:{self.var1}, var:{self.var2} - time: {self.date}"
    
class MatricesHistoric(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    determinant = models.BooleanField(null = True ,blank = True, default = False)
    date = models.DateTimeField(null = True, blank = True)
    number_rows_a = models.IntegerField(null = False, blank = False, default = 0)
    number_colunms_a = models.IntegerField(null = False, blank = False, default = 0)
    number_rows_b = models.IntegerField(null = True, blank = True)
    number_colunms_b = models.IntegerField(null = True, blank = True)
    matrix_a = models.TextField(null=False, blank = False, default = '[]')
    matrix_b = models.TextField(null=True, blank = True)

class FunctionHistoric(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    date = models.DateTimeField()
    function = models.TextField(blank = False, null = False, default = 'x')


   