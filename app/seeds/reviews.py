from app.models import db, Review


# Add rentals here if you want
def seed_reviews():
    review1 = Review(
        rating=4, description='''The person who is renting out this board is
        exceptional...understanding and willing to negotiate cost as well as meet the rentee
        wherever they want to. The board itself was alright...it was in an OK shape, which is
        why I am giving it a 4.''', surfboardId=1, userId=2)
    review2 = Review(
        rating=2, description='''The board is not meant for what the renter said it is
        meant for.''', surfboardId=1, userId=3)
    review3 = Review(
        rating=5, description='''The board is amazing and the renter is also.''',
        surfboardId=2, userId=4)
    review4 = Review(
        rating=5, description='''Get this one peeps.''', surfboardId=2, userId=1)
    review5 = Review(
        rating=1, description='''Unsure who is making these ratings,
        do not even consider getting this board.''', surfboardId=2, userId=3)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the rentals table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
