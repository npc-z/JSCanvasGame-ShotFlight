class Player extends Sprite {
    // constructor
    constructor(status, game) {
        super(status, game)
        this.speed = 10
        this.cooldown = 5
        this.setup()
    }

    moveX(x) {
        this.x += x
        if (this.x < 0) {
            this.x = 0
        }
        if ((this.x + this.width) > this.game.width) {
            this.x = this.game.width - this.width
        }
    }

    fire() {
        // 生产子弹
        if (this.cooldown < 0) {
            log('player fire')
            let stauts = {
                y: (this.y - 20),
                name: 'player_bullet',
            }
            let b = new Bullet(stauts, this.game)
            let x = this.x + b.width / 2
            b.x = x
            this.game.addSprites(b)
            if (this.game.debugMode) {
                this.cooldown = debug_config['player_cooldown']['value']
            } else {
                this.cooldown = 5
            }
        }
    }

    moveY(y) {
        this.y += y
        if (this.y < 0) {
            this.y = 0
        }
        if ((this.y + this.height) > this.game.height) {
            this.y = this.game.height - this.height
        }
    }

    moveLeft() {
        this.moveX(-this.speed)
    }

    moveRight() {
        this.moveX(this.speed)
    }

    moveUp() {
        this.moveY(-this.speed)
    }

    moveDown() {
        this.moveY(this.speed)
    }

    setup() {

        this.game.registerEvent('a', () => {
            this.moveLeft()
        })

        this.game.registerEvent('d', () => {
            this.moveRight()
        })

        this.game.registerEvent('w', () => {
            this.moveUp()
        })

        this.game.registerEvent('s', () => {
            this.moveDown()
        })

        this.game.registerEvent(' ', () => {
            this.fire()
        })
    }

    update() {
        super.update()
        this.cooldown -= 1
    }

}