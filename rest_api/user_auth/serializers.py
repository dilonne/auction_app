from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from .signals import user_created


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].required = False # set the password field as not required

    def validate(self, attrs):
        attrs.update({'password': ''}) # assign an empty string as password.

        if attrs['username'] == 'user1':
            self.user, created = User.objects.get_or_create(username='user1')

        elif attrs['username'] == "user2":
            self.user, created = User.objects.get_or_create(username='user2')
        else:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )
        if created:
            user_created.send(
                sender=self.__class__, 
                user=self.user
                )
        refresh = self.get_token(self.user)
        data = dict()
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
