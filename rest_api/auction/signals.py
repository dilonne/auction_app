from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Bid, AutoBid


@receiver(post_save, sender=Bid)
def auto_bid(sender, instance, created, **kwargs): 
    """
    Auto-bid auction items with auto-bid enabled 
    each time someone a bid
    """
    if created:
        AutoBid.outbid(instance)



