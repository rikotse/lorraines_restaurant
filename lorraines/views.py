from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .forms import NewsletterSubscriptionForm
from django.contrib import messages
from django.utils.dateparse import parse_date, parse_time
from .models import MenuItem, Reservation, Order, OrderItem, NewsletterSubscriber, Testimonial
from .serializers import MenuItemSerializer, CartItemSerializer
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.conf import settings
from django.db import migrations, models
from django.utils.timezone import now

def home(request):
    return render(request, 'lorraines/lorraines-restaurant.html')

def reservations(request):
    return render(request, 'lorraines/reservations.html')

def menu(request):
    return render(request, 'lorraines/menu.html')

def ordering(request):
    return render(request, 'lorraines/ordering.html')


def about(request):
    return render(request, 'lorraines/index.html') 

def testimonials(request):
    return render(request, 'lorraines/testimonials.html')


def reservation_success(request):
    return render(request, 'lorraines/reservation_success.html')


def submit_reservation(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        date = request.POST.get('date')
        time = request.POST.get('time')
        guests = request.POST.get('guests')
        occasion=request.POST.get('occasion')
        notes = request.POST.get('notes')

        Reservation.objects.create(
            name=name,
            email=email,
            phone=phone,
            date=date,
            time=time,
            guests=guests,
            occasion=occasion,
            notes=notes
        )
        return redirect('reservation_success')  
    return render(request, 'reservations')  

def add_review(request):
    if request.method == "POST":
        name = request.POST.get("reviewName")
        rating = request.POST.get("reviewRating")
        review = request.POST.get("reviewText")
        if name and review and rating:
            Testimonial.objects.create(name=name, review=review, rating=rating)
            return JsonResponse({"success": True})
        return JsonResponse({"success": False, "error": "Missing fields"})
    return JsonResponse({"success": False, "error": "Invalid method"})

@api_view(['POST'])
def add_to_cart(request):
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Item added to cart'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_menu_items(request):
    items = MenuItem.objects.all()
    return render(request, 'lorraines/menu.html', {'items': items})
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)

def subscribe_newsletter(request):
    if request.method == "POST":
        form = NewsletterSubscriptionForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)
            if created:
                # Send confirmation email
                send_mail(
                    subject="Thanks for subscribing to Lorraine's Weekly Newsletter!",
                    message="Hi there!\n\nThanks for subscribing to our weekly newsletter. Stay tuned for exclusive updates, specials, and delicious content from Lorraine’s Restaurant.\n\nWith love,\nThe Lorraine’s Team 💌",
                    from_email=settings.DEFAULT_FROM_EMAIL, 
                    recipient_list=[email],                  
                )
    if request.method == "POST":
        form = NewsletterSubscriptionForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)
            if created:
                messages.success(request, "Thanks for subscribing to our newsletter!")
            else:
                messages.info(request, "You're already subscribed.")
        else:
            messages.error(request, "Please enter a valid email address.")
    return redirect(request.META.get('HTTP_REFERER', '/'))

@csrf_exempt
def submit_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Extract data from request
        full_name = data.get('full_name')
        phone = data.get('phone')
        email = data.get('email')
        address = data.get('address')
        delivery_type = data.get('delivery_type')
        delivery_date = data.get('delivery_date')
        payment_method = data.get('payment_method')
        delivery_fee = data.get('delivery_fee', 0)
        subtotal = data.get('subtotal', 0)
        service_fee = data.get('service_fee', 0)
        total = data.get('total')
        notes = data.get('notes', '')
        cart_items = data.get('cart', [])

        # Create Order
        order = Order.objects.create(
            customer_name=full_name,
            phone=phone,
            email=email,
            address1=address,
            delivery_type=delivery_type,
            delivery_date=delivery_date,
            payment_method=payment_method,
            delivery_fee=delivery_fee,
            subtotal=subtotal,
            service_fee=service_fee,
            total_price=total,
            notes=notes
        )

        # Create OrderItems
    for item in cart_items:
        try:
            menu_item = MenuItem.objects.get(pk=item.get('id'))
        except MenuItem.DoesNotExist:
            continue  
        OrderItem.objects.create(
            order=order,
            menu_item=menu_item,
            name=item.get('name'),
            price=item.get('price'),
            quantity=item.get('quantity'),
            notes=item.get('notes', '')
        )

        # Send Confirmation Email
        subject = f"Your Lorraine’s Restaurant Order #{order.id} Confirmation"
        html_message = render_to_string('emails/order_confirmation.html', {
            'order': order,
            'items': cart_items
        })
        plain_message = strip_tags(html_message)

        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            html_message=html_message
        )

        return JsonResponse({'success': True, 'order_id': order.id})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def set_created_at(apps, schema_editor):
    OrderItem = apps.get_model('yourappname', 'OrderItem')
    for item in OrderItem.objects.all():
        if not item.created_at:
            item.created_at = now()
            item.save(update_fields=['created_at'])

class Migration(migrations.Migration):

    dependencies = [
        ('yourappname', 'previous_migration'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.RunPython(set_created_at),
        migrations.AlterField(
            model_name='orderitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
