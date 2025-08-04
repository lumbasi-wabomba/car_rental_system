from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import BookingForm
from .models import Car, Booking

# Create your views here.
def home(request):
    return render(request, 'rentals/home.html')

def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Registration successful.')
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'rentals/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful.')
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'rentals/login.html')

def user_logout(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('home')

def user_profile(request):
    if request.user.is_authenticated:
        return render(request, 'rentals/profile.html', {'user': request.user})
    else:
        messages.error(request, 'You need to be logged in to view your profile.')
        return redirect('login')

@login_required
def book_car(request, car_id):
    car = Car.objects.get(id=car_id)
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.user = request.user
            booking.car = car

            # Check for overlapping bookings
            overlapping = Booking.objects.filter(
                car=car,
                end_date__gte=booking.start_date,
                start_date__lte=booking.end_date
            )
            if overlapping.exists():
                messages.error(request, "This car is already booked for the selected dates.")
            else:
                booking.save()
                messages.success(request, "Car booked successfully!")
                return redirect('profile')  # or wherever you want
    else:
        form = BookingForm()
    
    return render(request, 'rentals/book_car.html', {'car': car, 'form': form})

def user_profile(request):
    if request.user.is_authenticated:
        bookings = Booking.objects.filter(user=request.user).select_related('car')
        return render(request, 'rentals/profile.html', {
            'user': request.user,
            'bookings': bookings
        })
    else:
        messages.error(request, 'You need to be logged in to view your profile.')
        return redirect('login')
