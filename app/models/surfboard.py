from .db import db
from .user import User


class Surfboard(db.Model):
    __tablename__ = 'surfboards'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255))
    size = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    owner_relation = db.relationship("User", back_populates="surfboards_relation")
    rentals_relation = db.relationship("Rental", back_populates="surfboard_relation", cascade="all, delete")
    reviews_relation = db.relationship("Review", back_populates="surfboard_relation", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'image': self.image,
            'size': self.size,
            'location': self.location,
            'ownerId': self.ownerId
        }
