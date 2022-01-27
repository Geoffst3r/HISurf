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
    rental6 = Rental(
        date='2022-01-20', surfboardId=1, userId=2)
    rental7 = Rental(
        date='2022-01-30', surfboardId=2, userId=2)
    rental8 = Rental(
        date='2022-01-30', surfboardId=10, userId=2)
    rental9 = Rental(
        date='2022-01-30', surfboardId=11, userId=2)
    rental10 = Rental(
        date='2022-01-30', surfboardId=12, userId=2)
    rental11 = Rental(
        date='2022-01-30', surfboardId=1, userId=3)
    rental12 = Rental(
        date='2022-01-30', surfboardId=2, userId=3)
    rental13 = Rental(
        date='2022-01-30', surfboardId=12, userId=3)
    rental14 = Rental(
        date='2022-01-30', surfboardId=11, userId=3)
    rental15 = Rental(
        date='2022-01-30', surfboardId=10, userId=3)

    db.session.add(rental1)
    db.session.add(rental2)
    db.session.add(rental3)
    db.session.add(rental4)
    db.session.add(rental5)
    db.session.add(rental6)
    db.session.add(rental7)
    db.session.add(rental8)
    db.session.add(rental9)
    db.session.add(rental10)
    db.session.add(rental11)
    db.session.add(rental12)
    db.session.add(rental13)
    db.session.add(rental14)
    db.session.add(rental15)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the rentals table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rentals():
    db.session.execute('TRUNCATE rentals RESTART IDENTITY CASCADE;')
    db.session.commit()
