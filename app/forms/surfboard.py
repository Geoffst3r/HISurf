from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField, FileField, IntegerField

class SurfboardForm(FlaskForm):
    location = SelectField('location', choices=['Oahu', 'Maui', 'Big Island', 'Kauai', 'Molokai', 'Lanai'])
    size = SelectField('size', choices=[6, 7, 8, 9, 10, 11])
    description = TextAreaField('description')
    image = FileField('image')
    ownerId = IntegerField('ownerId')
