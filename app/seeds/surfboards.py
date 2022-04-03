from app.models import db, Surfboard


# Add surfboards here if you want
def seed_surfboards():
    surfboard1 = Surfboard(
        description='This board is great for catching barrels. If you want to have fun, or even learn the basics on doing so, RENT THIS BOARD!', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(1)-crop.jpg",
        size=6, location='Oahu', ownerId=1)
    surfboard5 = Surfboard(
        description='This board is great for just cruising around. Yeah, I know you want to just chill. Look at you, I know you\'re stressed, take a load off.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(2)-crop.jpg",
        size=11, location='Oahu', ownerId=1)
    surfboard3 = Surfboard(
        description='Paddle Boarding? Gotta use this board. Paddle not included, sorry brudduh-ski.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(3).jpg",
        size=10, location='Maui', ownerId=2)
    surfboard4 = Surfboard(
        description='Great for amateurs that want to grow their surfing skills. Hang loose one stay da kine.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(4)-crop.jpg",
        size=9, location='Maui', ownerId=2)
    surfboard19 = Surfboard(
        description='This board was made to handle the rough surf at Sandy\'s. If you take it anywhere on the island, it will be sturdy and reliable.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(14)-crop.jpg",
        size=9, location='Oahu', ownerId=1)
    surfboard12 = Surfboard(
        description='You must be pretty good to be renting this board. Ho bruh, if you like rent this one board here you must know em already cuz.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(5)-crop.jpg",
        size=8, location='Big Island', ownerId=3)
    surfboard6 = Surfboard(
        description='How do you not have a board this size yet? This board is a good way to grow the skills.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(6)-crop.jpg",
        size=7, location='Big Island', ownerId=3)
    surfboard7 = Surfboard(
        description='First listing, I want to make some extra mula. Rent this board to help a brother out.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(7)-crop.jpg",
        size=10, location='Kaui', ownerId=4)
    surfboard25 = Surfboard(
        description='You cannot go wrong with this one! Waxed and polished by me right before it is handed off to you.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(15)-crop.jpg",
        size=10, location='Oahu', ownerId=1)
    surfboard24 = Surfboard(
        description='Standard surfboard through and through. Unsure what else to say about it.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(19)-crop.jpg",
        size=9, location='Big Island', ownerId=3)
    surfboard20 = Surfboard(
        description='The best place to take this board is right next to a bar. Make sure to be careful and don\'t drink and surf!', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(16)-crop.jpg",
        size=7, location='Maui', ownerId=2)
    surfboard8 = Surfboard(
        description='Kauai is the island to be for surfing. And this is the board YOU NEED in order to enjoy surfing around here.', image='', size=6, location='Kaui', ownerId=4)
    surfboard2 = Surfboard(
        description='This board is in rough shape, so I do not expect you to return it. Have fun...if you break a rib it isn\'t my fault.', image='', size=8, location='Molokai', ownerId=5)
    surfboard10 = Surfboard(
        description='Done with this board, hardly go surfing anymore because of the fam jam. If you want to buy this board, hmu and we can discuss the price.', image='', size=11, location='Molokai', ownerId=5)
    surfboard11 = Surfboard(
        description='Ho bruh we all one tight nit family here. You want this board, you know where I be.', image='', size=6, location='Lanai', ownerId=6)
    surfboard22 = Surfboard(
        description='This board can go anywhere. If you are in town, I can deliver this board to you since I work in town.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(17)-crop.jpg",
        size=8, location='Maui', ownerId=2)
    surfboard9 = Surfboard(
        description='Pay me in beer.', image='', size=7, location='Lanai', ownerId=6)
    surfboard13 = Surfboard(
        description='If you plan to go surfing on the East shore, this is the board for you. Get some shaved-ice while you\'re there.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(8)-crop.jpg",
        size=8, location='Oahu', ownerId=1)
    surfboard14 = Surfboard(
        description='Not really sure where you would go surfing around here, but this is for you whackos.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(9)-crop.jpg",
        size=6, location='Maui', ownerId=2)
    surfboard15 = Surfboard(
        description='The description was needed for this one, so ya know...', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(10)-crop.jpg",
        size=11, location='Big Island', ownerId=3)
    surfboard16 = Surfboard(
        description='Got another board to sell because this site be booming cuz make BANK.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(12)-crop.jpg",
        size=8, location='Kaui', ownerId=4)
    surfboard17 = Surfboard(
        description='Let\'s go surfing together, we can double down.', image="",
        size=7, location='Molokai', ownerId=5)
    surfboard21 = Surfboard(
        description='I use this board to surf around Diamond Head, therefore it is the place I recommend you take it.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(13)-crop.jpg",
        size=7, location='Oahu', ownerId=1)
    surfboard18 = Surfboard(
        description='Yeah, this board is just simply the best.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(11)-crop.jpg",
        size=8, location='Lanai', ownerId=6)
    surfboard23 = Surfboard(
        description='This board is being rented out by the owner of RipCurl. It is well taken care of. Rent it here or on our site.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(18)-crop.jpg",
        size=8, location='Maui', ownerId=2)
    surfboard26 = Surfboard(
        description='This board is on it\'s final fin -- so to speak. In other words, it is not in good shape. Feel free to purchase off me to use for something else or refurbish.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(20)-crop.jpg",
        size=7, location='Kaui', ownerId=4)
    surfboard27 = Surfboard(
        description='Great for beginners and amateurs! Easy to balance and turn on.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(21)-crop.jpg",
        size=11, location='Lanai', ownerId=6)
    surfboard28 = Surfboard(
        description='Turtle Bay doesn\'t have very high surf. Great place for to use this board.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed(22)-crop.jpg",
        size=10, location='Big Island', ownerId=3)
    surfboard29 = Surfboard(
        description='This board may break while used. If you want to buy it off me, I can sell it to you for cheap.', image="",
        size=11, location='Kaui', ownerId=3)
    surfboard30 = Surfboard(
        description='I am willing to give lessons if you\'re a first timer!', image='', size=10, location='Molokai', ownerId=5)

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
    db.session.add(surfboard13)
    db.session.add(surfboard14)
    db.session.add(surfboard15)
    db.session.add(surfboard16)
    db.session.add(surfboard17)
    db.session.add(surfboard18)
    db.session.add(surfboard19)
    db.session.add(surfboard20)
    db.session.add(surfboard21)
    db.session.add(surfboard22)
    db.session.add(surfboard23)
    db.session.add(surfboard24)
    db.session.add(surfboard25)
    db.session.add(surfboard26)
    db.session.add(surfboard27)
    db.session.add(surfboard28)
    db.session.add(surfboard29)
    db.session.add(surfboard30)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the surfboards table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_surfboards():
    db.session.execute('TRUNCATE surfboards RESTART IDENTITY CASCADE;')
    db.session.commit()
