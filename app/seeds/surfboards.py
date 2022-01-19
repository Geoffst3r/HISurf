from app.models import db, Surfboard


# Add surfboards here if you want
def seed_surfboards():
    surfboard1 = Surfboard(
        description='This board is great for catching barrels', image='', size=6, location='Oahu', ownerId=1)
    surfboard2 = Surfboard(
        description='This board is great for just cruising around', image='', size=11, location='Oahu', ownerId=1)

    db.session.add(surfboard1)
    db.session.add(surfboard2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the surfboards table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_surfboards():
    db.session.execute('TRUNCATE surfboards RESTART IDENTITY CASCADE;')
    db.session.commit()
