from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from django.db.models.functions import TruncMonth
from .models import Vehicle, Driver, Trip, Expense, MaintenanceLog
from .serializers import (
    VehicleSerializer, DriverSerializer, TripSerializer, 
    ExpenseSerializer, MaintenanceLogSerializer
)

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.IsAuthenticated]

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [permissions.IsAuthenticated]

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

class MaintenanceLogViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceLog.objects.all()
    serializer_class = MaintenanceLogSerializer
    permission_classes = [permissions.IsAuthenticated]

class AnalyticsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_fuel = Expense.objects.aggregate(total=Sum('fuel_expense'))['total'] or 0
        total_revenue = Trip.objects.aggregate(total=Sum('revenue'))['total'] or 0
        
        # Utilization: Vehicles with Ongoing trips / Total Vehicles
        total_vehicles = Vehicle.objects.count()
        active_trips = Trip.objects.filter(status='Ongoing').values('vehicle').distinct().count()
        utilization = (active_trips / total_vehicles * 100) if total_vehicles > 0 else 0

        # Expense distribution by vehicle class
        # (Joining Expense -> Trip -> Vehicle)
        expenses_by_class = Trip.objects.values('vehicle__type').annotate(
            total_expense=(Sum('expenses__fuel_expense') + Sum('expenses__misc_expense'))
        ).order_by('-total_expense')

        # Monthly performance
        monthly_performance = Trip.objects.annotate(month=TruncMonth('start_time')).values('month').annotate(
            revenue=Sum('revenue'),
            fuel_burn=Sum('expenses__fuel_expense'),
            service_cost=Sum('vehicle__maintenance_logs__cost'), # NOTE: maintenance_logs.cost is CharField in model, problematic for Sum
        ).order_by('month')

        # Since MaintenanceLog.cost is a CharField, we might need a workaround or fix the model.
        # For now, let's just use 0 if it fails or fix the model later if needed.
        # Let's fix the model cost field to DecimalField too for proper analytics.

        return Response({
            'total_fuel': total_fuel,
            'total_revenue': total_revenue,
            'utilization': round(utilization, 1),
            'expenses_by_class': expenses_by_class,
            'monthly_performance': monthly_performance
        })
