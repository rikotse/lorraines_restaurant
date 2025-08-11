from django.contrib import admin
from .models import MenuItem, Testimonial, Reservation, CartItem, Order, OrderItem

admin.site.register(MenuItem)
admin.site.register(Testimonial)
admin.site.register(Reservation)
admin.site.register(CartItem)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'delivery_type', 'payment_method', 'total_price', 'status', 'created_at']
    list_filter = ['status', 'delivery_type', 'payment_method']
    search_fields = ['customer_name', 'email', 'phone']
    inlines = [OrderItemInline]

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'menu_item', 'quantity', 'notes']
    search_fields = ['menu_item__title', 'order__customer_name']