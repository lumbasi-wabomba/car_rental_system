from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta


# Create your models here.
class Car(models.Model):
    make = models.CharField(max_length=200)
    model = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    year_make = models.IntegerField()
    hiring_cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
   
    def __str__(self):
        return f"{self.num_plate}, {self.make}, {self.model}, ({self.year_make})"
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey('Car', on_delete=models.CASCADE)
    start_date =  models.DateField()
    end_date = models.DateField()
    booking_date = models.DateField(auto_now_add=True)  

    def total_days(self):
        return (self.end_date - self.start_date).days + 1
    
    def total_cost(self):
        return(self.total_days() * self.car.hiring_cost)

    def __str__(self):
        return f" {self.user.username} booked {self.car} from {self.start_date} to {self.end_date}"
