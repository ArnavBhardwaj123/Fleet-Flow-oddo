from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VehicleViewSet, DriverViewSet, TripViewSet, 
    ExpenseViewSet, MaintenanceLogViewSet, AnalyticsView
)

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'trips', TripViewSet)
router.register(r'expenses', ExpenseViewSet)
router.register(r'maintenance', MaintenanceLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/', AnalyticsView.as_view(), name='analytics'),
]
