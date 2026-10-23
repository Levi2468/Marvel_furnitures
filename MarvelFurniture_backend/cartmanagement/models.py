from django.db import models


class CartItem(models.Model):
    cart_id = models.CharField(max_length=100)
    product_id = models.CharField(max_length=100)
    old_price = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["cart_id", "product_id"],
                name="unique_product_in_cart"
            )
        ]

    def __str__(self):
        return self.name