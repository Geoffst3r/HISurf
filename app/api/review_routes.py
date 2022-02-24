from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:surfboardId>/')
def getAllReviews(surfboardId):
    reviews = db.session.query(Review).filter(Review.surfboardId == surfboardId).all()
    if reviews:
        reviews_list = [review.to_dict() for review in reviews]
        return jsonify(reviews_list)
    else:
        return jsonify('No Reviews Found')

@review_routes.route('/<int:surfboardId>/', methods=["POST"])
@login_required
def newReview(surfboardId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        rating = form.data['rating']
        description = form.data['description']
        newReview = Review(
            surfboardId = surfboardId,
            userId = current_user.id,
            rating = rating,
            description = description
        )
        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:reviewId>/', methods=["PUT"])
@login_required
def editReview(reviewId):
    review = Review.query.filter(Review.id == reviewId)
    if not review:
        return jsonify('Review does not exist')

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rating = form.data['rating']
        description = form.data['description']
        review.rating = rating
        review.description = description
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:reviewId>/', methods=["DELETE"])
@login_required
def deleteReview(reviewId):
    review = Review.query.filter(Review.id == reviewId)
    if not review:
        return jsonify('Review does not exist')
    db.session.delete(review)
    db.session.commit()
    return jsonify('Success')
