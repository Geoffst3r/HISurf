from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Surfboard

surfboard_routes = Blueprint('surfboards', __name__)

@surfboard_routes.route('/')
def get_all_listings():
    listings = db.session.query(Surfboard).all()
    if listings:
        listings_list = [listing.to_dict() for listing in listings]
        return jsonify(listings_list)
    else:
        return jsonify('Surfboard Listings not found')

@surfboard_routes.route('/', methods=["POST"])
@login_required
def post_new_listing():
    data = request.get_json(force=True)
    description = data['description']
    size = data['size']
    location = data['location']
    if location == '' or size == '' or description == '':
        return jsonify('bad data'), 400
    image = None
    if 'image' in data:
        image = data['image']
    try:
        new_listing = {
            'description': description,
            'size': size,
            'location': location,
            'ownerId': data['ownerId']
        }
        if image:
            new_listing['image'] = image
        new_listing_db = Surfboard(**new_listing)
        db.session.add(new_listing_db)
        db.session.commit()
        return new_listing_db.to_dict()
    except IntegrityError as e:
        print(e)
        return jsonify('Database entry error')

@surfboard_routes.route('/<int:surfboardId>/')
@login_required
def get_single_listing(surfboardId):
    listing = Surfboard.query.filter(Surfboard.id == surfboardId).first()
    if listing:
        return listing.to_dict()
    else:
        return jsonify("Listing does not exist")

@surfboard_routes.route('/<int:surfboardId>/', methods=["PUT"])
@login_required
def edit_listing(surfboardId):
    listing = Surfboard.query.filter(Surfboard.id == surfboardId).first()
    if not listing:
        return jsonify('Listing does not exist.')
    data = request.get_json(force=True)
    description = data['description']
    size = data['size']
    location = data['location']
    if description == '' or size == '' or location == '':
        return jsonify('bad data')
    listing.description = description
    listing.size = size
    listing.location = location
    if 'image' in data and data['image'] != '':
        listing['image'] = data['image']
    db.session.commit()
    return listing.to_dict()

@surfboard_routes.route('/<int:surfboardId>/', methods=["DELETE"])
def delete_listing(surfboardId):
    listing = Surfboard.query.filter(Surfboard.id == surfboardId).first()
    if listing:
        db.session.delete(listing)
        db.session.commit()
        return jsonify("Success")
    else:
        return jsonify("Listing does not exist")
