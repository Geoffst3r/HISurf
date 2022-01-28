from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Surfboard
from app.forms import SurfboardForm
from app.api.aws.config import upload_file_to_s3, allowed_file, get_unique_filename

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
    form = SurfboardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    image = form.data['image']

    if image != 'null':
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    else:
        url = ''
    if form.validate_on_submit():
        new_surfboard = Surfboard(
            location=form.data['location'],
            size=form.data['size'],
            description=form.data['description'],
            image=url,
            ownerId=current_user.id)
        db.session.add(new_surfboard)
        db.session.commit()
        return new_surfboard.to_dict()
    else:
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
    form = SurfboardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    listing = Surfboard.query.filter(Surfboard.id == surfboardId).first()
    if not listing:
        return jsonify('Listing does not exist.')
    description = form.data['description']
    size = form.data['size']
    location = form.data['location']
    image = form.data['image']
    if description == '' or location == '' or size == 0:
        return jsonify('bad data')
    listing.description = description
    listing.size = size
    listing.location = location

    if image == 'null':
        url = listing.image
    elif image == 'remove':
        url = ''
    elif image != 'null':
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
    else:
        url = ''
    listing.image = url
    db.session.commit()
    return listing.to_dict()

@surfboard_routes.route('/<int:surfboardId>/', methods=["DELETE"])
@login_required
def delete_listing(surfboardId):
    listing = Surfboard.query.filter(Surfboard.id == surfboardId).first()
    if listing:
        db.session.delete(listing)
        db.session.commit()
        return jsonify("Success")
    else:
        return jsonify("Listing does not exist")
