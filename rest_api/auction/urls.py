from django.urls import path, include
from rest_framework import routers

from .views import *

# Non-Nested Routers
router = routers.DefaultRouter()
router.register('antiques', AntiqueViewSet) 
router.register('auctions', AuctionViewSet) 
router.register('auction_items', AuctionItemViewSet) 
router.register('bids', BidViewSet) 
router.register('auto_bid', AutoBidViewSet) 


urlpatterns = [
    path('', include(router.urls)),

]