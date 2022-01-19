import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


def is_email(form, field):
    # Use RegEx to check if the email string is a basic form email
    email = field.data
    result = re.match(r'[0-9A-Za-z]+@[0-9A-Za-z]+\.com', email)
    if not result:
        raise ValidationError('Please provide a valid email.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
