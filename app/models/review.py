from .db import db
from .surfboard import Surfboard
from .user import User


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    surfboardId = db.Column(db.Integer, db.ForeignKey(Surfboard.id), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    surfboard_relation = db.relationship("Surfboard", back_populates="reviews_relation")
    user_relation = db.relationship("User", back_populates="reviews_relation")
