from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


from .serializers import *
from .models import *


class AntiqueViewSet(viewsets.ModelViewSet):
    """
    Antique ViewSet
    """
    queryset = Antique.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AntiqueSerializer


class AuctionViewSet(viewsets.ModelViewSet):
    """
    Auction ViewSet
    """
    queryset = Auction.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AuctionSerializer


class AuctionItemViewSet(viewsets.ModelViewSet):
    """
    Auction Item ViewSet
    """
    queryset = AuctionItem.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AuctionItemSerializer

    def get_serializer_class(self):
        serializer_class = self.serializer_class 
        if self.action in ['list', 'retrieve']: 
            serializer_class = AuctionItemDetailSerializer 
        return serializer_class

    def get_queryset(self):
        """
        Optionally restricts the returned items,
        by filtering against a `min_price` and
        `max_price` query parameter in the URL.
        """
        queryset = AuctionItem.objects.all()
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if not None in (min_price, max_price):
            queryset = queryset.filter(base_price__range=(min_price, max_price))
        return queryset


class BidViewSet(viewsets.ModelViewSet):
    """
    Bid ViewSet
    """
    queryset = Bid.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = BidSerializer


class AutoBidViewSet(viewsets.ModelViewSet):
    """
    Auto Bid ViewSet
    """
    queryset = AutoBid.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AutoBidSerializer

    # TODO: Inherit from a generic apiview(read and update only)

