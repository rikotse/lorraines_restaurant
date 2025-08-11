from django.urls import path
from . import views
from .views import get_menu_items,  subscribe_newsletter

urlpatterns = [
    # API route
    path('api/menu/', get_menu_items),

    # HTML page routes
    path('', views.home, name='home'),
    path('menu/', views.menu, name='menu'),
    path('reservations/', views.reservations, name='reservations'),
    path('ordering/', views.ordering, name='ordering'),
    path('index/', views.about, name='about'),
    path('testimonials/', views.testimonials, name='testimonials'),
    path('submit-reservation/', views.submit_reservation, name='submit_reservation'),
    path('reservation-success/', views.reservation_success, name='reservation_success'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('api/menu-items/', views.get_menu_items, name='get_menu_items'),
    path('submit-order/', views.submit_order, name='submit_order'),
    path('subscribe/', subscribe_newsletter, name='subscribe_newsletter'),
    path("add-review/", views.add_review, name="add_review"),
]
