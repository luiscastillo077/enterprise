controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Torpedo = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 8 8 8 8 8 8 . . . . . . . 
        . . 2 8 8 8 8 8 8 2 5 . . . . . 
        . . 2 8 8 8 8 8 8 2 5 . . . . . 
        . . 2 8 8 8 8 8 8 2 5 . . . . . 
        . . 2 8 8 8 8 8 8 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Enterprise, 100, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.pewPew.play()
    Faser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 2 . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Enterprise, 100, 0)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    Plasma.destroy(effects.ashes, 500)
    music.magicWand.play()
    info.changeLifeBy(1)
    info.changeScoreBy(2)
})
info.onLifeZero(function () {
    Enterprise.destroy(effects.disintegrate, 500)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 100)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let Romulano: Sprite = null
let Plasma: Sprite = null
let Faser: Sprite = null
let Torpedo: Sprite = null
let Enterprise: Sprite = null
effects.starField.startScreenEffect()
Enterprise = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . . . . . 1 1 1 1 1 1 1 1 1 1 1 
    . . . . . 1 1 1 1 b b b b 1 1 1 
    . . . . . 1 1 1 1 b 2 2 b 1 1 1 
    . . . . . 1 1 1 1 b b b b 1 1 1 
    . . . . . 1 1 1 1 1 1 1 1 1 1 1 
    . 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . 2 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Enterprise.setFlag(SpriteFlag.StayInScreen, true)
Enterprise.setPosition(0, 58)
info.setLife(3)
info.setScore(0)
controller.moveSprite(Enterprise, 200, 200)
game.onUpdateInterval(5000, function () {
    Plasma = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . c a a a c . . . . . . . 
        . . . c c f a b b c . . . . . . 
        . . . b f f b f a a . . . . . . 
        . . . b b a b f f a . . . . . . 
        . . . c b f b b a c . . . . . . 
        . . . . b a f c c . . . . . . . 
        . . . . . b b c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    Plasma.setVelocity(-50, 0)
    Plasma.setPosition(163, randint(2, 118))
})
forever(function () {
    if (info.score() == 100) {
        game.over(true, effects.confetti)
    }
})
game.onUpdateInterval(500, function () {
    Romulano = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 7 7 7 7 7 7 7 2 . . . 
        . . . . 7 7 7 7 . . . . . . . . 
        . . . . . . . 7 7 7 7 7 5 . . . 
        . . . . . . 7 7 7 7 7 7 8 . . . 
        . . . . . . 7 7 7 7 7 7 8 . . . 
        . . . . . . . 7 7 7 7 7 5 . . . 
        . . . . 7 7 7 7 . . . . . . . . 
        . . . . . 7 7 7 7 7 7 7 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    Romulano.setVelocity(-60, 0)
    Romulano.setPosition(155, randint(0, 118))
})
