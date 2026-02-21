from rest_framework import serializers
from .models import Vehicle, Driver, Trip, Expense, MaintenanceLog

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    vehicle_plate = serializers.CharField(source='vehicle.plate', read_only=True)
    driver_name = serializers.CharField(source='driver.name', read_only=True)
    fleet_type = serializers.CharField(source='vehicle.type', read_only=True)

    class Meta:
        model = Trip
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    driver_name = serializers.CharField(source='trip.driver.name', read_only=True)
    trip_id_display = serializers.CharField(source='trip.id', read_only=True)

    class Meta:
        model = Expense
        fields = '__all__'

class MaintenanceLogSerializer(serializers.ModelSerializer):
    vehicle_plate = serializers.CharField(source='vehicle.plate', read_only=True)

    class Meta:
        model = MaintenanceLog
        fields = '__all__'
