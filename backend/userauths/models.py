

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# vos autres imports...

# Le CustomUserManager RESTE IDENTIQUE. Il fonctionnera parfaitement avec l'héritage.
class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password,  **extra_fields)

    def create_superuser(self, email, password=None,   **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password,  **extra_fields)


# LE MODÈLE USER SIMPLIFIÉ
class User(AbstractBaseUser, PermissionsMixin):
    # Les champs qui sont communs à TOUS les utilisateurs restent ici.
    email = models.EmailField(db_index=True, unique=True, max_length=254)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    role =  models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    # Champs requis pour l'intégration avec l'admin Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Requis pour la commande `createsuperuser`

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
