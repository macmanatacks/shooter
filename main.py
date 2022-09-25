def on_up_pressed():
    mySprite.vy = 0
    mySprite.vy += -200
    pause(200)
    mySprite.vy += 400
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    global projectile
    if direction == 50:
        projectile = sprites.create_projectile_from_sprite(img("""
                . . . . . . . . 
                            f f f f f . . . 
                            f f f f f f f . 
                            f f f f f f f . 
                            f f f f f f f . 
                            f f f f f f f . 
                            f f f f f . . . 
                            . . . . . . . .
            """),
            mySprite,
            direction,
            0)
    if direction == -50:
        projectile = sprites.create_projectile_from_sprite(img("""
                . . . . . . . . 
                            . . . f f f f f 
                            . f f f f f f f 
                            . f f f f f f f 
                            . f f f f f f f 
                            . f f f f f f f 
                            . . . f f f f f 
                            . . . . . . . .
            """),
            mySprite,
            direction,
            0)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global direction
    mySprite.vx = 0
    mySprite.vx = -20
    direction = -50
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    global direction
    mySprite.vx = 0
    mySprite.vx = 20
    direction = 50
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

projectile: Sprite = None
direction = 0
mySprite: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
scene.set_background_color(13)
mySprite = sprites.create(img("""
        . . . . . . . . 
            . . . 4 4 . . . 
            . . . 4 4 . . . 
            . . 7 7 7 7 . . 
            . . 7 7 7 7 . . 
            . . . e e . . . 
            . . . 6 6 . . . 
            . . . 6 6 . . .
    """),
    SpriteKind.player)
mySprite.set_stay_in_screen(True)
mySprite.set_position(80, 115)
myEnemy = sprites.create(img("""
        . . . . . . . . 
            . . . . . . . . 
            . . . f f . . . 
            . . . f f . . . 
            . 2 2 2 2 2 2 . 
            . 2 . f f . 2 . 
            . 2 . 4 4 . 2 . 
            . . . 4 4 . . .
    """),
    SpriteKind.enemy)
tiles.place_on_random_tile(myEnemy, assets.tile("""
    myTile3
"""))
myEnemy.vy += 1000
myEnemy.set_stay_in_screen(True)

def on_forever():
    if projectile == myEnemy:
        tiles.place_on_random_tile(myEnemy, assets.tile("""
            myTile3
        """))
forever(on_forever)
