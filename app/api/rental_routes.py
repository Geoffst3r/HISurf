from flask import Blueprint, jsonify, request
from flask_login import current_user
from datetime import date
from app.models import db, Rental
from app.forms import RentalForm
from app.api.auth_routes import validation_errors_to_error_messages

rental_routes = Blueprint('rentals', __name__)

@rental_routes.route('/<int:surfboardId>/')
def get_all_rentals(surfboardId):
    today = date.today()
    rentals = db.session.query(Rental).filter(Rental.surfboardId == surfboardId, Rental.date >= today).all()
    if rentals:
        rentals_list = [rental.to_dict() for rental in rentals]
        return jsonify(rentals_list)
    else:
        return jsonify('Rentals not found')

@rental_routes.route('/<int:surfboardId>/', methods=["POST"])
def post_new_rental(surfboardId):
    form = RentalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.data['date']:
        return {'error': 'date required'}, 400
    date = form.data['date']

    if form.validate_on_submit():
        new_rental = Rental(surfboardId=surfboardId, userId=current_user.id, date=date)
        db.session.add(new_rental)
        db.session.commit()
        return new_rental.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@rental_routes.route('/<int:rentalId>/', methods=["PUT"])
def edit_rental(rentalId):
    rental = Rental.query.filter(Rental.id == rentalId).first()
    form = RentalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not rental:
        return jsonify('Rental does not exist.')

    if not form.data['date']:
        return {'error': 'date required'}, 400
    if form.validate_on_submit():
        date = form.data['date']
        rental.date = date
        db.session.commit()
        return rental.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@rental_routes.route('/<int:rentalId>/', methods=["DELETE"])
def delete_rental(rentalId):
    rental = Rental.query.filter(Rental.id == rentalId).first()
    if rental:
        db.session.delete(rental)
        db.session.commit()
        return jsonify("Success")
    else:
        return jsonify("Rental does not exist")
