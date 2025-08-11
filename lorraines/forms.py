from django import forms

class NewsletterSubscriptionForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'placeholder': 'Enter your email',
        'class': 'newsletter-email-input'
    }))
