from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField

class RentalForm(FlaskForm):
    date = DateField('date')
    surfboardId = IntegerField('surfboardId')
    userId = IntegerField('userId')
