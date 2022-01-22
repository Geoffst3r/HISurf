from flask import Blueprint, jsonify, request
from app.models import db, Image
from flask_login import login_required
from app.api.aws.config import upload_file_to_s3, allowed_file, get_unique_filename

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload():
    if "image" not in request.files:
        return jsonify("image required"), 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return jsonify("file type not permitted"), 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    new_image = Image(url=url)
    db.session.add(new_image)
    db.session.commit()
    return jsonify(url)
