from rest_framework import serializers
from datetime import datetime 
from django.shortcuts import get_object_or_404

from .models import Antique, Auction, AuctionItem, AutoBid, Bid


class AntiqueSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Antique
        fields = '__all__'
      
    def create(self, validated_data):
        return Antique.objects.create(**validated_data)


class BidSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Bid
        fields = ('__all__')        
        extra_kwargs = {
                'bidder': {'read_only': True},
                'date_placed': {'read_only': True}
            }

    def validate(self, data):
        """
        Validates if bid price less than current price
        and if the bidder is currently the highest bidder
        """
        user = self.context.get("request").user
        price = data['price']
        item = data['auction_item']
   
        if price <= item.current_price:
            raise serializers.ValidationError({
                "price": "Bid price cannot be less than current price"
                })

        user_highest_bid =  Bid.get_user_highest(user, item)
        if user_highest_bid >= item.current_price: 
                raise serializers.ValidationError({
                "price": "You can't outbid yourself!"
                })
        return data

      
    def create(self, validated_data):
        user = self.context.get("request").user
        return Bid.objects.create(bidder=user, **validated_data)



class AuctionSerializer(serializers.ModelSerializer):    
    remaining_time = serializers.ReadOnlyField()
    class Meta:
        model = Auction
        fields = '__all__'
      
    def create(self, validated_data):
        return Auction.objects.create(**validated_data)



class AuctionItemDetailSerializer(serializers.ModelSerializer):
    antique = AntiqueSerializer(read_only=True)
    auction = AuctionSerializer(read_only=True)
    bids = BidSerializer(many=True, read_only=True)
    current_price = serializers.ReadOnlyField()

    class Meta:
        model = AuctionItem
        fields = '__all__'


class AuctionItemSerializer(serializers.ModelSerializer):    
    class Meta:
        model = AuctionItem
        fields = '__all__'
      
    def create(self, validated_data):
        return AuctionItem.objects.create(**validated_data)


class AutoBidSerializer(serializers.ModelSerializer):    
    class Meta:
        model = AutoBid
        fields = ('max_amount', 'user')        
        extra_kwargs = {
                'user': {'read_only': True}
            }