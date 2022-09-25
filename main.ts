controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = 0
    mySprite.vy += -200
    pause(200)
    mySprite.vy += 300
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setFlag(SpriteFlag.ShowPhysics, true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction == 100) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            f f f f f . . . 
            f f f f f f f . 
            f f f f f f f . 
            f f f f f f f . 
            f f f f f f f . 
            f f f f f . . . 
            . . . . . . . . 
            `, mySprite, direction, 0)
    }
    if (direction == -100) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            . . . f f f f f 
            . f f f f f f f 
            . f f f f f f f 
            . f f f f f f f 
            . f f f f f f f 
            . . . f f f f f 
            . . . . . . . . 
            `, mySprite, direction, 0)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx = 0
    mySprite.vx = -50
    direction = -100
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx = 0
    mySprite.vx = 50
    direction = 100
})
info.onLifeZero(function () {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(myEnemy, assets.tile`myTile3`)
    KILLS += 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
let KILLS = 0
let projectile: Sprite = null
let direction = 0
let myEnemy: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
scene.setBackgroundColor(13)
mySprite = sprites.create(img`
    . . . . . . . . 
    . . . 4 4 . . . 
    . . . 4 4 . . . 
    . . 7 7 7 7 . . 
    . . 7 7 7 7 . . 
    . . . e e . . . 
    . . . 6 6 . . . 
    . . . 6 6 . . . 
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 115)
myEnemy = sprites.create(img`
    . . . . . . . . 
    . . . . . . . . 
    . . . f f . . . 
    . . . f f . . . 
    . 2 2 2 2 2 2 . 
    . 2 . f f . 2 . 
    . 2 . 4 4 . 2 . 
    . . . 4 4 . . . 
    `, SpriteKind.Enemy)
tiles.placeOnRandomTile(myEnemy, assets.tile`myTile3`)
myEnemy.y = 114
myEnemy.setStayInScreen(true)
myEnemy.ay = 500
info.setLife(1)
forever(function () {
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(330, music.beat(BeatFraction.Half))
    music.playTone(440, music.beat(BeatFraction.Half))
    music.playTone(294, music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Half))
})
forever(function () {
    if (KILLS == 10) {
        game.over(true)
    }
})
