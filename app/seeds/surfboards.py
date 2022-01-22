from app.models import db, Surfboard


# Add surfboards here if you want
def seed_surfboards():
    surfboard1 = Surfboard(
        description='This board is great for catching barrels', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%281%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070400Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=540002dd1dd72b33965e61057e800dee2e9139ba3ae209ee08aae70b4f716052",
        size=6, location='Oahu', ownerId=1)
    surfboard2 = Surfboard(
        description='This board is great for just cruising around', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%282%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070427Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=8561a65b5d549e8eaf63e08a8af518f4c4c85db3ec6e42663a0a886fe62c929d",
        size=11, location='Oahu', ownerId=1)
    surfboard3 = Surfboard(
        description='Paddle Boarding? Gotta use this board', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%283%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070455Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=dff31dcfac1989052569092785456c1d3fa2a106a8004c35d19b9bc2bd7eba0f",
        size=10, location='Maui', ownerId=2)
    surfboard4 = Surfboard(
        description='Great for amateurs that want to grow their surfing skills', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%284%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070517Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=a94d484878e559813ef9a6b37f94d74d9237d8426f7fb6e0d48138d9e217dccb",
        size=9, location='Maui', ownerId=2)
    surfboard5 = Surfboard(
        description='You must be pretty good to be renting this board', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%285%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070536Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=4c5f01ac0f926b80040f8e2cb944b1b8792038ef11a8635c97a25a4d032c9cf1",
        size=8, location='Big Island', ownerId=3)
    surfboard6 = Surfboard(
        description='How do you not have a board this size yet?', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%286%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070547Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=b88e184631b455a652498ab85b4f93b4b903fa3bb53ef50c2c052c51ce1935fa",
        size=7, location='Big Island', ownerId=3)
    surfboard7 = Surfboard(
        description='Testing the seed, need to change late.', image="https://hi-surf-dev.s3.us-west-1.amazonaws.com/seed%287%29.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMSJGMEQCIEvhGqwTITe6Acib8BDfE%2FyKYS6ovHgr1JVTQYaLQmwEAiANeVu5BoKS4WTpeXFHzg%2B4ZlinOWxqPpAONP6XM4m5ByrkAgg3EAAaDDUzNTE2MzYwNTYyNCIMYWRb%2Fcfjf4wSsDdHKsECWunKDT2H6wag1FIPwHrCCXHriq%2B62vrtsLLc0Zh%2FPPZSkp%2Bwbe4uH63NApMnyRJPvzJ54GdE45Lm49lv5eJaEnIdnJCvsRfc0aT93h1zwqZL42ykpLSoLassE7n07mLZH52DVctlbvHAeaSJRpRSTMYHAStvAbIOcFjnelTKaraalDU3YRDcz7p%2Fn2XuW%2FtrFj4OPhIhS5LHCpwKU9F0u3ZdOkPcK1iHDq23bnu2%2Bb7ddtOqF04hWWN5g8DhFTIECkPnqGNZ5V2%2FZdn0EBbHMRxzBpM62RjVwJNwCrIAUBqNIiwsK97heyId2MqZioBNw%2B%2FMKJB4jUBqy4jdsyu%2Fm9LsczDpsirYGgZOMSCIS8a0boIw6qsAfGfwWm%2BOO9%2BGSTGwbbf10oqOYoQrl42aD1NXymTb0ECXBlh5%2BIvtt1JNMMDerI8GOrQCQVa5omlsRETV3m2qrylaKyFo46MkRLJDzMlOTwr3gQJYNIhdMFvTnAmoR7ZI58cKpWDtOMNdRUdq22oluanys8TFGDuwY2HuJok%2BLGSO9R1d4Wyzsch%2BihcusHCc5KHQ3SyDS3ba6ltVv9lrSld6deZLM%2B58QcNpxy8qVgNyrGR4lhDcEkFMpA%2F%2Fo09DUsK%2FZE3EBJnC5YXu8cFT0%2B0Ym2al%2Fl9ZAr0G97UdM500otn21A8wHAS6hvJCgOyBjco8LnYFSYMyHsc%2B6ePoU5DaYuE72XTnqAYPnzWezGhSrKViJ2ea2fuuzeQV8lH%2BrDTljV0ozcDVKIetfNs8tteVUUOaU4%2ByfOEQU1GdWPqRx%2BP9OnlBZXl3pkZdtUeP4MfeB4cP8ysMiwn5UMwzQBbvT5xcgck%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220122T070600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXZGR4SJ4JWTYQRGQ%2F20220122%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=54b071a2cbd7567a617a56a30f7f0dfa90cb98c56bd9f3c3d3dac2746cf7bb20",
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
