from django.urls import path
from .views import GenerateCourseView # et vos autres vues

urlpatterns = [
    # ... vos autres URLs
    path('', GenerateCourseView.as_view(), name='generate_course'),
 
]