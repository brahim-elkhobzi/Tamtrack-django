from django.urls import path
from .views import GenerateCourseView # et vos autres vues

urlpatterns = [
    # ... vos autres URLs
    path('<str:matiere_name>/', GenerateCourseView.as_view(), name='generate_course'),

]