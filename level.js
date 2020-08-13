const levels = [{
    platforms: [{
            x: 400,
            y: 400,
            width: 200,
            height: 50
        }, {
            x: 600,
            y: 275,
            width: 200,
            height: 50
        },
        {
            x: 750,
            y: 400,
            width: 100,
            height: 500
        }
    ],
    signs: [{
        title: "Salvation Awaits!",
        body: "But only if you go right... let the arrow keys guide you.",
        icon: "info",
        confirm: "Ok?",
        x: 400,
        y: 350
    }, {
        title: "Go forth, young one!",
        body: "In a world of mysterious shapes and puzzles... you must forge your own path. As long as the path you forge conforms to the exact progression of the world... that is. Otherwise you die a horrible death.",
        icon: "info",
        confirm: "That's mildly alarming... but ok!",
        x: 600,
        y: 225
    }]
}, {
    platforms: [{
        x: 400,
        y: 400,
        width: 200,
        height: 50
    }, {
        x: 200,
        y: 275,
        width: 200,
        height: 50
    }, {
        x: 400,
        y: 150,
        width: 200,
        height: 50
    }, {
        x: 700,
        y: 75,
        width: 200,
        height: 50
    }, {
        x: 750,
        y: 500,
        width: 100,
        height: 800
    }],
    signs: [{
        title: "Beware the square.",
        body: "Squares are mindless (maybe?) creatures that roam platforms aimlessly (they may have complex inner lives though - no one can know for sure). They won't try and attack you, but if you touch them... you'll take quite a lot of damage. The bigger the square, the more damage it deals. So heed this warning in your travels.",
        icon: "error",
        confirm: "I will!",
        x: 200,
        y: 475
    }, {
        title: "The Power of Time is Yours",
        body: "If your actions lead you into an inescapable trap, or you are otherwise stuck, press Q to restart the level.",
        icon: "info",
        confirm: "Ok.",
        x: 400,
        y: 100
    }],
    enemies: [{
        type: "square",
        size: 25,
        x: 400,
        y: 350,
        speed: 5
    }, {
        type: "square",
        size: 25,
        x: 200,
        y: 225,
        speed: 5
    }, {
        type: "square",
        size: 25,
        x: 400,
        y: 100,
        speed: 5
    }]
}, {
    platforms: [{
            x: 400,
            y: 125,
            width: 100,
            height: 25
        }, {
            x: 600,
            y: 125,
            width: 100,
            height: 25
        }, {
            x: 500,
            y: 375,
            width: 100,
            height: 25
        },
        {
            x: 450,
            y: 250,
            width: 200,
            height: 25
        }, {
            x: 775,
            y: 100,
            width: 50,
            height: 500
        }, {
            x: 284,
            y: 100,
            width: 50,
            height: 280
        }
    ],
    signs: [{
        title: "Dead Shapes Are Scattered Throughout the Land",
        body: "Shapes, drained of their color, are dead - they are inanimate objects only controlled by the laws of physics. They yet have more life than the dull platforms, suspended forever in one location.",
        icon: "info",
        confirm: "That's depressing...",
        x: 200,
        y: 475
    }, {
        title: "Squares Are Bound By Ropes Left Ages Ago",
        body: "The legendary polygons of ages past leave behind mysterious contraptions - the original purpose of them is unknown. Squares are often bound to the corpses of long dead shapes - a bop on the head should relieve a square of its burden.",
        icon: "info",
        confirm: "Those poor squares!",
        x: 500,
        y: 340
    }],
    enemies: [{
        type: "square",
        x: 400,
        y: 100,
        size: 80,
        speed: 5,
        constraint: {
            to: 1,
            length: 300,
            stiffness: 0.01,
        },
    }, {
        type: "square",
        x: 600,
        y: 100,
        size: 80,
        speed: 5,
        constraint: {
            to: 1,
            length: 500,
            stiffness: 0.01,
        }
    }, {
        type: "square",
        x: 750,
        y: 400,
        size: 150,
        speed: 0
    }],
    dynamicBodies: [{
        type: "circle",
        x: 75,
        y: 100,
        radius: 50
    }, {
        type: "rectangle",
        x: 150,
        y: 250,
        width: 350,
        height: 25,
        joint: {
            x: 150,
            y: 250
        }
    }]
}, {
    plates: [{
        x: 230,
        y: 495,
        move: [{
            to: 1,
            x: 0,
            y: 100
        }]
    }, {
        x: 720,
        y: 270,
        move: [{
            to: 2,
            x: 0,
            y: -100
        }, {
            to: 3,
            x: 0,
            y: -100
        }]
    }],
    platforms: [{
        x: 800,
        y: 200,
        width: 50,
        height: 400
    }, {
        x: 800,
        y: 450,
        width: 50,
        height: 100,
        movable: true
    }, {
        x: 190,
        y: 550,
        width: 25,
        height: 100,
        movable: true
    }, {
        x: 270,
        y: 550,
        width: 25,
        height: 100,
        movable: true
    }, {
        x: 400,
        y: 300,
        width: 200,
        height: 50
    }, {
        x: 700,
        y: 300,
        width: 200,
        height: 50
    }, {
        x: 612.5,
        y: 250,
        height: 100,
        width: 25
    }, {
        x: 550,
        y: 400,
        width: 100,
        height: 25
    }],
    enemies: [{
        x: 400,
        y: 250,
        size: 30,
        type: "square",
        speed: 5
    }],
    dynamicBodies: [{
        x: 625,
        y: 250,
        radius: 15,
        type: "circle"
    }],
    signs: [{
        title: "Pressure Plates Wield Strange Magic",
        body: "In ye olden days, all of shapekind benefited from mysterious technomagic. Now, the magic has all but faded - leaving but a few remaining pressure plates. Though their color is a dull yellow, they possess some vestiges of magic - enough to open doors, lift platforms, and the like. They can be activated by anything - you, squares, even the corpses of dead shapes.",
        icon: "info",
        confirm: "Ooh - magic!",
        x: 550,
        y: 365
    }]
}, {
    plates: [{
        x: 100,
        y: 495,
        move: [{
            to: 2,
            x: 0,
            y: -50
        }, {
            to: 3,
            x: 0,
            y: 75
        }, {
            to: 4,
            x: 75,
            y: 0
        }],
        enemiesOnly: true
    }, {
        x: 500,
        y: 495,
        move: [{
            to: 1,
            x: 0,
            y: -50
        }],
    }, {
        x: 650,
        y: 495,
        move: [{
            to: 5,
            x: -100,
            y: 0
        }]
    }],
    platforms: [{
        x: 750,
        y: 400,
        width: 100,
        height: 600
    }, {
        x: 62.5,
        y: 525,
        width: 25,
        height: 50,
        movable: true
    }, {
        x: 137.5,
        y: 525,
        width: 25,
        height: 50,
        movable: true
    }, {
        x: 612.5,
        y: 462.5,
        width: 25,
        height: 75,
        movable: true
    }, {
        x: 662.5,
        y: 437.5,
        width: 75,
        height: 25,
        movable: true
    }, {
        x: 150,
        y: 200,
        width: 100,
        height: 25,
        movable: true
    }],
    enemies: [{
        type: "square",
        x: 250,
        y: 450,
        size: 20,
        speed: 3
    }],
    dynamicBodies: [{
        type: "rectangle",
        x: 400,
        y: 300,
        width: 600,
        height: 50,
        joint: {
            x: 400,
            y: 300
        }
    }, {
        type: "circle",
        x: 300,
        y: 450,
        radius: 15
    }, {
        type: "circle",
        x: 400,
        y: 450,
        radius: 15
    }, {
        type: "circle",
        x: 150,
        y: 180,
        radius: 50
    }],
    signs: [{
        title: "The Coloring of Pressure Plates Varies",
        body: "The color of a given pressure plate indicates what can activate it. Yellow pressure plates can be activated by everything. Grey pressure plates can only be activated by you. And blue pressure plates (like the one over there), can only be activated by squares. Perhaps this strange magic had some use in the times of old.",
        icon: "info",
        confirm: "Thanks for the information, random sign!",
        x: 550,
        y: 475
    }]
}, {
    plates: [{
        x: 650,
        y: 495,
        upStep: 0.01,
        move: [{
            to: 6,
            x: 0,
            y: -147.5
        }]
    }, {
        x: 100,
        y: 245,
        upStep: 0.01,
        downStep: 0.1,
        move: [{
            to: 7,
            x: 0,
            y: -262.5
        }]
    }, {
        x: 200,
        y: 50,
        upStep: 0.01,
        move: [{
            to: 8,
            x: 0,
            y: -75
        }]
    }, {
        x: 700,
        y: 120,
        move: [{
            to: 1,
            x: 0,
            y: 100
        }]
    }],
    platforms: [{
        x: 800,
        y: 0,
        width: 50,
        height: 800
    }, {
        x: 800,
        y: 450,
        width: 50,
        height: 100,
        movable: true
    }, {
        x: 700,
        y: 150,
        width: 200,
        height: 50
    }, {
        x: 400,
        y: 400,
        width: 200,
        height: 50
    }, {
        x: 150,
        y: 275,
        width: 200,
        height: 50
    }, {
        x: 400,
        y: 150,
        width: 200,
        height: 50
    }, {
        x: 525,
        y: 550,
        width: 50,
        height: 100,
        movable: true
    }, {
        x: 275,
        y: 425,
        width: 50,
        height: 100,
        movable: true
    }, {
        x: 550,
        y: 200,
        width: 100,
        height: 50,
        movable: true
    }, {
        x: 237.5,
        y: 325,
        width: 25,
        height: 150
    }, {
        x: 200,
        y: 60,
        width: 75,
        height: 10
    }],
    dynamicBodies: [{
        type: "circle",
        radius: 20,
        x: 525,
        y: 450,
    }]
}]

function renderLevel(level) {
    World.remove(engine.world, platforms);
    World.remove(engine.world, grapplePoints);
    World.remove(engine.world, enemies);
    World.remove(engine.world, enemyConstraints);
    World.remove(engine.world, dynamicBodies);
    World.remove(engine.world, plates);
    enemyConstraints = [];
    readPlatforms((levels[level - 1] && levels[level - 1].platforms) || []);
    readPlates((levels[level - 1] && levels[level - 1].plates) || []);
    readDB((levels[level - 1] && levels[level - 1].dynamicBodies) || []);
    readSigns((levels[level - 1] && levels[level - 1].signs) || []);
    readEnemies((levels[level - 1] && levels[level - 1].enemies) || []);
    readGPoints((levels[level - 1] && levels[level - 1].grapplePoints) || []);
    World.add(engine.world, platforms);
    World.add(engine.world, grapplePoints);
    World.add(engine.world, enemies);
    World.add(engine.world, enemyConstraints);
    World.add(engine.world, dynamicBodies);
    World.add(engine.world, plates);

}