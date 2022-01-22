from app.models import db, Surfboard


# Add surfboards here if you want
def seed_surfboards():
    surfboard1 = Surfboard(
        description='This board is great for catching barrels', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(1).jpg",
        size=6, location='Oahu', ownerId=1)
    surfboard2 = Surfboard(
        description='This board is great for just cruising around', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(2).jpg",
        size=11, location='Oahu', ownerId=1)
    surfboard3 = Surfboard(
        description='Paddle Boarding? Gotta use this board', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(3).jpg",
        size=10, location='Maui', ownerId=2)
    surfboard4 = Surfboard(
        description='Great for amateurs that want to grow their surfing skills', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(4).jpg",
        size=9, location='Maui', ownerId=2)
    surfboard5 = Surfboard(
        description='You must be pretty good to be renting this board', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(5).jpg",
        size=8, location='Big Island', ownerId=3)
    surfboard6 = Surfboard(
        description='How do you not have a board this size yet?', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(6).jpg",
        size=7, location='Big Island', ownerId=3)
    surfboard7 = Surfboard(
        description='Testing the seed, need to change late.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(7).jpg",
        size=10, location='Kaui', ownerId=4)
    surfboard8 = Surfboard(
        description='Testing the seed, need to change late.', image='', size=6, location='Kaui', ownerId=4)
    surfboard9 = Surfboard(
        description='Testing the seed, need to change late.', image='', size=8, location='Molokai', ownerId=5)
    surfboard10 = Surfboard(
        description='Testing the seed, need to change late.', image='', size=11, location='Molokai', ownerId=5)
    surfboard11 = Surfboard(
        description='Testing the seed, need to change late.', image='', size=6, location='Lanai', ownerId=6)
    surfboard12 = Surfboard(
        description='Testing the seed, need to change late.', image='', size=7, location='Lanai', ownerId=6)

    db.session.add(surfboard1)
    db.session.add(surfboard2)
    db.session.add(surfboard3)
    db.session.add(surfboard4)
    db.session.add(surfboard5)
    db.session.add(surfboard6)
    db.session.add(surfboard7)
    db.session.add(surfboard8)
    db.session.add(surfboard9)
    db.session.add(surfboard10)
    db.session.add(surfboard11)
    db.session.add(surfboard12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the surfboards table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_surfboards():
    db.session.execute('TRUNCATE surfboards RESTART IDENTITY CASCADE;')
    db.session.commit()
