from .db import db
from .surfboard import Surfboard


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    surfboardId = db.Column(db.Integer, db.ForeignKey(Surfboard.id), nullable=False)
    url = db.Column(db.Integer, db.ForeignKey(Surfboard.id), nullable=False)
