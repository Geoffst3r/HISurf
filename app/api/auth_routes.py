from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user
from datetime import date
from app.models import User, Surfboard, Rental, db
from app.forms import LoginForm
from app.forms import SignUpForm

auth_routes = Blueprint('auth', __name__)
today = date.today()


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        surfboards = Surfboard.query.filter(Surfboard.ownerId == current_user.id).all()
        surfboards_list = {surfboard.id: {'id': surfboard.id, 'description': surfboard.description,
        'size': surfboard.size, 'location': surfboard.location} for surfboard in surfboards}
        rentals = Rental.query.filter(Rental.userId == current_user.id, Rental.date >= today).all()
        rentals_list = {rental.id: {'id': rental.id, 'surfboardId': rental.surfboardId,
        'date': rental.date,
        'size': Surfboard.query.filter(Surfboard.id == rental.surfboardId).first().size,
        'location': Surfboard.query.filter(Surfboard.id == rental.surfboardId).first().location}
        for rental in rentals}
        res_user = {'id': current_user.id, 'username': current_user.username, 'listings': surfboards_list,
        'rentals': rentals_list}
        return jsonify(res_user)
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login/', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        surfboards = Surfboard.query.filter(Surfboard.ownerId == user.id).all()
        surfboards_list = {surfboard.id: {'id': surfboard.id, 'description': surfboard.description,
        'size': surfboard.size, 'location': surfboard.location} for surfboard in surfboards}
        rentals = Rental.query.join(Surfboard).filter(Rental.userId == user.id, Rental.date >= today).all()
        rentals_list = {rental.id: {'id': rental.id, 'surfboardId': rental.surfboardId,
        'date': rental.date,
        'size': Surfboard.query.filter(Surfboard.id == rental.surfboardId).first().size,
        'location': Surfboard.query.filter(Surfboard.id == rental.surfboardId).first().location}
        for rental in rentals}
        res_user = {'id': user.id, 'username': user.username, 'listings': surfboards_list,
        'rentals': rentals_list}
        return jsonify(res_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout/')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup/', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        res_user = {'id': user.id, 'username': user.username, 'listings': {},
        'rentals': {}}
        return jsonify(res_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized/')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
