
from django.dispatch import Signal, receiver
from django.db import IntegrityError

from auction.models import AutoBid

user_created = Signal(providing_args=["user"])


@receiver(user_created)
def setup_auto_bidding(sender, user, **kwargs):
    try:
        AutoBid.objects.create(user=user)
    except IntegrityError as e:
        pass