from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserRegisterSerializer(serializers.ModelSerializer):
    mobile = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'mobile', 'confirm_password'] 
        extra_kwargs = {'password': {'write_only': True}}
          # All the above fields need to be included

    # Validate that password and confirm_password match
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    # Create the User and Profile
    def create(self, validated_data):
        validated_data.pop('confirm_password')  # remove confirm_password
        name = validated_data.pop('name')
        mobile = validated_data.pop('mobile')
        email = validated_data.get('email')
        password = validated_data.get('password')

        # Create User
        user = User.objects.create_user(username=name, email=email, password=password)

        # Create Profile linked to user
        Profile.objects.create(user=user, mobile=mobile)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'mobile', 'created_at']
        read_only_fields = ['id', 'created_at']


# username and email are belongs to User Model  and Mobile belongs to profile model , so we need to create a 
# separate function to update the userdata,, same model aayirunnenkil  update function ezhthanda
    def update(self, instance, validated_data):
        # Extract nested user data
        user_data = validated_data.pop('user', {})
        username = user_data.get('username')
        email = user_data.get('email')

        # Update User fields
        if username:
            instance.user.username = username
        if email:
            instance.user.email = email
        instance.user.save()

        # Update Profile fields
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.save()

        return instance


