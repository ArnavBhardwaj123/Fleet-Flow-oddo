from django.contrib import admin
from .models import Vehicle, Driver, Trip, Expense, MaintenanceLog

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('plate', 'model', 'type', 'capacity', 'odometer', 'status')
    list_filter = ('status', 'type')
    search_fields = ('plate', 'model')

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_number', 'expiry_date', 'safety_score')
    search_fields = ('name', 'license_number')

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle', 'driver', 'status')
    list_filter = ('status',)

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('trip', 'fuel_expense', 'misc_expense', 'status')

@admin.register(MaintenanceLog)
class MaintenanceLogAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'issue', 'date', 'status')
    list_filter = ('status',)
