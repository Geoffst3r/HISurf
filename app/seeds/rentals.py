from app.models import db, Rental


# Add rentals here if you want
def seed_rentals():
    rental1 = Rental(
        date='2022-01-20', surfboardId=3, userId=1)
    rental2 = Rental(
        date='2022-01-30', surfboardId=4, userId=1)
    rental3 = Rental(
        date='2022-01-30', surfboardId=5, userId=1)
    rental4 = Rental(
        date='2022-01-30', surfboardId=6, userId=1)
    rental5 = Rental(
        date='2022-01-30', surfboardId=7, userId=1)

    db.session.add(rental1)
    db.session.add(rental2)
    db.session.add(rental3)
    db.session.add(rental4)
    db.session.add(rental5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the rentals table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rentals():
    db.session.execute('TRUNCATE rentals RESTART IDENTITY CASCADE;')
    db.session.commit()
