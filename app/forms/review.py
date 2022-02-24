from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    rating = TextAreaField('rating', validators=[DataRequired()])
    description = IntegerField('description', validators=[DataRequired()])
    surfboardId = IntegerField('surfboardId')
    userId = IntegerField('userId')
