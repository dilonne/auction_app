from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from django.db.models.deletion import CASCADE, SET_NULL
from django.db.models import Max, F, Q
from django.db.models.fields.related import ForeignKey
from django.conf import settings
from django.utils import timezone

class Antique(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
  

class Auction(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    @property
    def remaining_time(self):
        now = timezone.now()
        rt = self.end_date - now
        return rt


class AuctionItem(models.Model):
    auction = models.ForeignKey(
        Auction,
        related_name='items',
        on_delete=models.CASCADE
    )
    antique = models.OneToOneField(Antique, on_delete=models.CASCADE)
    base_price = models.DecimalField(
        max_digits = 14, 
        decimal_places=2, 
        default=0.00
    )
    @property
    def current_price(self):
        current_highest = Bid.objects.aggregate(Max('price'))['price__max'] 
        if current_highest is None: # no bid placed 
            return self.base_price
        return current_highest


class Bid(models.Model):
    auction_item = models.ForeignKey(
        AuctionItem, 
        on_delete=models.CASCADE,
        related_name="bids"
        )
    price = models.DecimalField(
        max_digits = 14, 
        decimal_places=2, 
        default=0.00
    )
    bidder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date_placed = models.DateTimeField(auto_now_add=True)
    auto_bidding = models.BooleanField(default=False)

    @classmethod
    def get_user_highest(cls, user, item):
        highest = cls.objects.filter(
            bidder=user,
            auction_item=item
            ).aggregate(Max('price'))['price__max']

        return 0 if highest is None else highest



class AutoBid(models.Model):
    """
    Represents the AutoBid Bot and Configuration 
    Settings
    """
    max_amount = models.DecimalField(
        max_digits = 14, 
        decimal_places=2, 
        default=0.00
    )

    used_amount = models.DecimalField(
        max_digits = 14, 
        decimal_places=2, 
        default=0.00
    )
    user = models.OneToOneField(User, on_delete=CASCADE)

    @property
    def remaining_amount(self):
        return self.max_amount - self.used_amount


    @staticmethod
    def outbid(bid):
        qs0 = Bid.objects.annotate(
            funds_remaining=F('bidder__autobid__max_amount') - F('bidder__autobid__used_amount')
        ).filter(
                Q(auction_item=bid.auction_item) &
                Q(auto_bidding=True) &
                Q(funds_remaining__gte=settings.AUTO_BIDDING_STEP)         
            ).exclude( 
            bidder=bid.bidder
            )
        if qs0.exists():
            qs0.update(
                price=F('price') + settings.AUTO_BIDDING_STEP
            )  
            qs1 = User.objects.filter(bid__in=qs0)

            AutoBid.objects.filter(user__in=qs1).update(
                used_amount=F('used_amount') + settings.AUTO_BIDDING_STEP
            )
            
          




































            # update deals with concurrency issues(see taken screenshot)

        # qs = bid.auction_items.bids.exclude(
        #     bidder=bid.bidder
        #     ).filter(
        #         auto_bidding)             
            
        # if qs.exists():
        #     qs.update(
        #         price=F('price') + 1
        #     )
