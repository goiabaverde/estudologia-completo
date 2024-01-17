from django.contrib import admin
from .models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'password']

class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'abstract']

class InventoryAdmin(admin.ModelAdmin):
    list_display = ['user']
    filter_horizontal = ['courses']

class HistoricAdmin(admin.ModelAdmin):
    list_display = ['user', 'type_app' ,'var1', 'var2']

class MatricesHistoricAdmin(admin.ModelAdmin):
    list_display = ['user', 'number_rows_a', 'number_colunms_a', 'matrix_a']

class FuctionHistoricAdmin(admin.ModelAdmin):
    list_display= ['user', 'function']

admin.site.register(User, UserAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(Historic, HistoricAdmin)
admin.site.register(MatricesHistoric, MatricesHistoricAdmin)
admin.site.register(FunctionHistoric, FuctionHistoricAdmin)