#  teachers/serializers.py
from rest_framework import serializers
from userauths.models import User
from .models import Teacher

class TeacherRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'phone')

    def create(self, validated_data):
        validated_data['role'] = 'teacher'
        user = User.objects.create_user(**validated_data)
        Teacher.objects.create(user=user)
        return user