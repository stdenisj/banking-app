from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('accounts', views.AccountView)
router.register('users', views.UserView)
router.register('transactions', views.TransactionView)

urlpatterns = [
    path('', include(router.urls))
]