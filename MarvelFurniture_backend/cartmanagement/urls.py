from django.urls import path
from .views import cart_api

urlpatterns = [
    path("cart/", cart_api, name="cart_api"),
]