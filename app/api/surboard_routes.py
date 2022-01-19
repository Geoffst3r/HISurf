import json
from sqlite3 import IntegrityError
from flask import Blueprint, jsonify, request
from app.models import db, User, Surfboard

surfboard_routes = Blueprint('surfboards', __name__)

@surfboard_routes.route('/')
def get_all_listings():
    listings = db.session.query(Surfboard).all()
    if listings:
        listings_list = [{'id': listing.id, 'description': listing.description, 'image': listing.image,
        'size': listing.size, 'location': listing.location, 'ownerId': listing.ownerId} for listing in listings]
        return jsonify(listings_list)
    else:
        return jsonify('Surfboard Listings not found')

@surfboard_routes.route('/', methods=["POST"])
def post_new_listing():
    data = request.get_json(force=True)
    description = data['description']
    size = data['size']
    location = data['location']
    if description == '' or size == '' or location == '':
        return jsonify('bad data')
    try:
        new_listing = {
            'description': description,
            'size': size,
            'location': location,
            'ownerId': data['ownerId']
        }
        if 'image' in data and data['image'] != '':
            new_listing['image'] = data['image']
        new_listing_db = Surfboard(**new_listing)
        db.session.add(new_listing_db)
        db.session.commit()
        return new_listing_db.to_dict()
    except IntegrityError as e:
        print(e)
        return jsonify('Database entry error')
