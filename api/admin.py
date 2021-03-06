from django.contrib import admin
from .models import *

# class ProductByLanguageAdmin(SortableAdmin):
#   exclude = ['url',
#   ]
#   model = ProductByLanguage
#   list_filter = ('language',)

# class FeatureAdmin(SortableAdmin):

#   exclude = [ 'url',
#   ]
#   list_filter = ('language',)
    
# class TopFeatureAdmin(SortableAdmin):

#   def has_add_permission(self, request):
#       return False if self.model.objects.count() >= 4 else True
class TodoInline(admin.TabularInline):
    model = Todo

class ListAdmin(admin.ModelAdmin):
    inlines = [
        TodoInline,
    ]

admin.site.register(Board)
admin.site.register(Label)
admin.site.register(List, ListAdmin)
admin.site.register(Todo)
admin.site.register(User)
