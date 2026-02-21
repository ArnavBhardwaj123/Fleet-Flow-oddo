from django.db import models

class Vehicle(models.Model):
    STATUS_CHOICES = [
        ('Idle', 'Idle'),
        ('Active', 'Active'),
        ('Maintenance', 'Maintenance'),
    ]
    plate = models.CharField(max_length=20, unique=True)
    model = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    capacity = models.IntegerField(default=0)
    odometer = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Idle')

    def __str__(self):
        return self.plate

class Driver(models.Model):
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    expiry_date = models.DateField()
    completion_rate = models.IntegerField(default=0)
    safety_score = models.IntegerField(default=100)
    complaints = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Trip(models.Model):
    STATUS_CHOICES = [
        ('Planned', 'Planned'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='trips')
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='trips')
    start_location = models.CharField(max_length=255)
    end_location = models.CharField(max_length=255)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Planned')

    def __str__(self):
        return f"Trip {self.id} - {self.vehicle.plate}"

class Expense(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='expenses')
    fuel_expense = models.DecimalField(max_digits=10, decimal_places=2)
    misc_expense = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Done')

    def __str__(self):
        return f"Expense for Trip {self.trip.id}"

class MaintenanceLog(models.Model):
    STATUS_CHOICES = [
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
    ]
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='maintenance_logs')
    issue = models.CharField(max_length=255)
    date = models.CharField(max_length=20)
    cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')

    def __str__(self):
        return f"Maintenance for {self.vehicle.plate} - {self.issue}"
