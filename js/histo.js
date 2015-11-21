////////////////////////
// Глобальные объекты //
////////////////////////
var histo;
var histos;
var COLORS = [0x1abc9c, 0x2ecc71, 0x3498db, 0x9b59b6, 0x16a085, 0x27ae60, 0x2980b9, 0x8e44ad, 0xf1c40f, 0xe67e22, 0xe74c3c, 0xf39c12, 0xd35400, 0xc0392b];


function createHistos() {
    var numberOfHistos = 100;
    histoLayer = game.add.group();
    histoLayer.enableBody = true; 

    for (var i = 0; i < numberOfHistos; i++) {
        var minCoordX = 50;
        var maxCoordX = 150;
        var randCoordX = 400 + i*200 + Math.floor(Math.random() * (maxCoordX - minCoordX + 1)) + minCoordX;
        var speed = 200;
        
        createHisto(randCoordX, speed);
    }
}

function createHisto(randCoordX, speed) {
    var maxFloor = 5;
    var minFloor = 1;
    var randFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    var randDirection = Math.floor(Math.random() * 2);
    var coordY = game.world.height / 2;
    var randCoordY;
    if (randDirection === 0) {
        randCoordY = coordY + 1;
    } else {
        randCoordY = coordY - randFloor*20 - 2;
    }

    var randColor = Math.floor(Math.random() * 7);
    var histo = histoLayer.create(randCoordX, randCoordY, 'histo');
    game.physics.arcade.enable(histo); 
    histo.scale.setTo(1, randFloor*2);
    histo.body.immovable = true;
    histo.body.velocity.set(-speed, 0);
    histo.body.bounce.y  = 0;

    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    histo.tint = color;

    return histo;
}

function updateHistoPerTick() {

    histoLayer.forEach(function(item) {

        // game.physics.arcade.collide(player, item);
        if (Phaser.Rectangle.intersects(player.getBounds(), item.getBounds())) {
            if (item.height <= 50){
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                item.body.velocity.set(500, plusOrMinus*500);
                item.alpha = 1;
                game.add.tween(item).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
                counter = counter + item.height*10;
            } else {
                var ooops = platforms.create(0, 0, 'ooops');
                ooops.scale.setTo(1, 1);
                ooops.body.immovable = true;
                timer.stop();
            }  
        }
    });

}

