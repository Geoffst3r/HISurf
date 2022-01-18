from .db import db
from .surfboard import Surfboard
from .user import User


class Rental(db.Model):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    surfboardId = db.Column(db.Integer, db.ForeignKey(Surfboard.id), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    surfboard_relation = db.relationship("Surfboard", back_populates="rentals_relation")
    user_relation = db.relationship("User", back_populates="rentals_relation")
