from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Rental


def approved_rental(form, field):
    # Checking if password matches
    date = field.data
    surfboardId = form.data['surfboardId']
    userId = form.data['userId']
    surfboardRentals = Rental.query.filter(Rental.surfboardId == surfboardId).all()
    rental_dates = [(rental.date, rental.surfboardId) for rental in surfboardRentals]
    user_rental_dates = [(rental.date, rental.surfboardId, rental.userId) for rental in surfboardRentals]
    if (date, surfboardId, userId) in user_rental_dates:
        raise ValidationError('You are already renting this board for this day.')
    if (date, surfboardId) in rental_dates:
        raise ValidationError('This board is already being rented on this day.')

class RentalForm(FlaskForm):
    date = DateField('date', validators=[DataRequired(), approved_rental])
    surfboardId = IntegerField('surfboardId')
    userId = IntegerField('userId')
