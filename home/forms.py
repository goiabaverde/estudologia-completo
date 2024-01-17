from django import forms

class RegisterForm(forms.Form):
    username = forms.CharField(label='Usuário', widget=forms.TextInput({ "placeholder": "Usuário"}))
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput, label="Senha",)
    confirm_password = forms.CharField(widget=forms.PasswordInput, label="Confirmar Senha",)

class LoginForm(forms.Form):
    username = forms.CharField(label='Usuário', widget=forms.TextInput({ "placeholder": "Usuário"}))
    password = forms.CharField(widget=forms.PasswordInput, label="Senha")

