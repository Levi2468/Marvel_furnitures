from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import CartItem
from .serializers import CartItemSerializer


@api_view(["GET", "PUT"])
def cart_api(request):

    cart_id = request.query_params.get("cart_id")

    if request.method == "PUT":
        cart_id = request.data.get("cart_id")

    if not cart_id:
        return Response(
            {"error": "Cart ID is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # GET: Retrieve the complete cart
    if request.method == "GET":

        items = CartItem.objects.filter(cart_id=cart_id)

        serializer = CartItemSerializer(items, many=True)

        return Response(serializer.data)

    # PUT: Replace the complete cart
    if request.method == "PUT":

        items = request.data.get("items")

        if not isinstance(items, list):
            return Response(
                {"error": "Items must be a list"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CartItemSerializer(
            data=items,
            many=True
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update the database as one transaction
        with transaction.atomic():

            CartItem.objects.filter(cart_id=cart_id).delete()

            CartItem.objects.bulk_create([
                CartItem(
                    cart_id=cart_id,
                    **item
                )
                for item in serializer.validated_data
            ])

            saved_items = CartItem.objects.filter(
                cart_id=cart_id
            )

            result = CartItemSerializer(
                saved_items,
                many=True
            )

            return Response(result.data)