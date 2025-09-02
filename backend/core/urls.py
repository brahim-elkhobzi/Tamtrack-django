# # Fichier : core/urls.py (le fichier principal du projet)

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Route pour l'administration Django
    #path('admin/', admin.site.urls),

    
    # POINT D'ENTRÉE UNIQUE POUR TOUTES LES URLS DE VOTRE API
    # Toutes les routes commenceront par /api/
    path('api/', include('api.urls')),
    path('api/auth/', include('userauths.urls')),
]

# Note: Nous avons retiré TOUS les autres `include` (chat, quiz, etc.)
# car ils seront gérés par le fichier `api.urls` pour être sous le préfixe /api/.