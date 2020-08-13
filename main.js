const { Engine, Composite, Render, World, Bodies, Body, Detector, Constraint } = Matter;

let engine;
let platforms = [];
let grapplePoints = [];
let signs = [];
let enemies = [];
let enemyConstraints = [];
let dynamicBodies = [];
let plates = [];
let playerConstraint;
let player;
let playerHealth = 100;
let playerMaxHealth = 100;
let ground;
let RIGHT = false;
let LEFT = false;
let JUMPING = false;
let level = 1;
let readingSign = false;

function readPlatforms(plats) {
    platforms = [];
    plats.forEach(({ x, y, width, height, movable }) => {
        let p = Bodies.rectangle(x, y, width, height, {
            isStatic: true,
        });
        p.oldX = x;
        p.oldY = y;
        p.platMove = movable;
        platforms.push(p);
    })
}

function readGPoints(points) {
    grapplePoints = [];
    points.forEach(({ x, y }) => {
        grapplePoints.push(Bodies.circle(x, y, 5, {
            isStatic: true,
        }));
    })
}

function readEnemies(e) {
    enemies = [];
    e.forEach(({ x, y, size, type, speed, constraint, dir }) => {
        let e;
        if (type === "square") {
            e = Bodies.rectangle(x, y, size, size, {
                isStatic: false
            });
            e.enemySpeed = speed;
            e.enemyTick = round(random(20, 40));
            e.waitTime = round(random(50, 70));
            e.enemyDirection = dir !== undefined ? dir : 1;
            e.enemySize = size;
            e.canSwitch = true;
        }
        if (constraint) {
            const c = Constraint.create({
                bodyA: e,
                bodyB: dynamicBodies[constraint.to],
                pointB: { x: 0, y: 0 },
                length: constraint.length,
                stiffness: constraint.stiffness !== undefined ? constraint.stiffness : 1,
                damping: constraint.damping !== undefined ? constraint.damping : 0,
                pointB: constraint.offset !== undefined ? constraint.offset : { x: 0, y: 0 }
            });
            c.cUnbreakable = constraint.unbreakable;
            enemyConstraints.push(c);
            e.enemyC = c;
        }
        e.enemyType = type;
        enemies.push(e);
    })
}

function readDB(d) {
    dynamicBodies = [];
    d.forEach(({ x, y, type, width, height, radius, joint }) => {
        let b;
        let a;
        let c;
        if (type === "circle") {
            b = Bodies.circle(x, y, radius, {
                isStatic: false
            });
        } else if (type === "rectangle") {
            b = Bodies.rectangle(x, y, width, height, {
                isStatic: false
            });
        }
        if (joint) {
            a = Bodies.circle(joint.x, joint.y, 0, {
                isStatic: true
            });
            a.bodyType = "joint";
            c = Constraint.create({
                bodyA: a,
                bodyB: b
            })
            dynamicBodies.push(a, c);
        }
        b.bodyType = type;
        dynamicBodies.push(b);
        if (a) {
            dynamicBodies.push(a);
        }
        if (c) {
            dynamicBodies.push(c);
        }
    })
}

function readPlates(p) {
    plates = [];
    p.forEach(({ x, y, move, enemiesOnly, downStep, upStep }) => {
        let p = Bodies.rectangle(x, y, 50, 10, {
            isStatic: true
        });
        p.plateCooldown = 0;
        p.plateMove = move;
        p.enemiesOnly = enemiesOnly;
        p.downStep = downStep !== undefined ? downStep : 0.5;
        p.upStep = upStep !== undefined ? upStep : 1;
        plates.push(p)
    })
}

function readSigns(s) {
    signs = s;
}

function setup() {
    createCanvas(800, 600);

    // create an engine
    engine = Engine.create();

    // create two boxes and a ground
    player = Bodies.circle(25, height - 125, 12.5);
    ground = Bodies.rectangle(width / 2, height - 50, width + 10, 100, {
        isStatic: true,
    });
    renderLevel(level);
    World.add(engine.world, [player, ground]);

    Engine.run(engine);
}

function clampAbs(val, max) {
    if (val < -max) {
        return -max;
    }
    if (val > max) {
        return max;
    }
    return val;
}
let damageToTake = 0;

function takeDamage(dmg) {
    playerHealth -= dmg;
    if (playerHealth > 0) {
        damageToTake += dmg;
    }
}

function gainHealth(hp) {
    if (hp > playerMaxHealth - playerHealth) {
        hp = playerMaxHealth - playerHealth;
    }
    playerHealth += hp;
}

function draw() {
    background(0);
    fill(255);
    noStroke();
    rectMode(CORNER);
    rect(20, 20, playerHealth, 25);
    if (damageToTake > 0) {
        damageToTake -= 0.5;
    } else {
        damageToTake = 0;
    }
    if (playerHealth < 0) {
        playerHealth = 0;
    }
    fill(180);
    rect(20 + playerHealth, 20, damageToTake, 25);
    noFill();
    stroke(125);
    strokeWeight(5);
    rect(20, 20, 100, 25);
    strokeWeight(1);
    textFont("monospace");
    signs.forEach(sign => {
        noStroke();
        fill(200);
        rectMode(CENTER);
        rect(sign.x, sign.y, 20, 50);
        fill(180);
        rect(sign.x, sign.y - 25, 75, 50);
        stroke(255);
        strokeWeight(5);
        line(sign.x - 75 / 3, sign.y - 40, sign.x + 75 / 3, sign.y - 40);
        line(sign.x - 75 / 3, sign.y - 25, sign.x + 75 / 3, sign.y - 25);
        line(sign.x - 75 / 3, sign.y - 10, sign.x + 75 / 3, sign.y - 10);
        strokeWeight(1);
        if (dist(player.position.x, player.position.y, sign.x, sign.y) < 100) {
            textSize(15);
            fill(255);
            text("Press R to Read Sign", width - 190, 20)
            if (key.toLowerCase() === "r" && keyIsPressed && !readingSign) {
                readingSign = true;
                Swal.fire({
                    title: sign.title,
                    text: sign.body,
                    icon: sign.icon,
                    confirmButtonText: sign.confirm
                }).then(() => {
                    readingSign = false;
                })
            }
        }
    })
    noStroke();
    fill(128);
    drawVertices(ground.vertices);
    platforms.forEach(platform => {
        if (platform.platMove) {
            fill(180);
        } else {
            fill(128);
        }
        drawVertices(platform.vertices);
    });
    fill(210);
    dynamicBodies.forEach(body => {
        if (body.bodyType === "circle") {
            drawCircle(body);
        } else if (body.bodyType === "rectangle") {
            drawVertices(body.vertices);
        } else if (body.bodyType === "joint") {
            fill(0);
            circle(body.position.x, body.position.y, 5)
            fill(210);
        }
    })
    fill(180, 180, 100);
    plates.forEach(plate => {
        if (plate.enemiesOnly) {
            fill(100, 180, 180);
        } else {
            fill(180, 180, 100);
        }
        drawVertices(plate.vertices);
        let collisions;
        if (plate.enemiesOnly) {
            collisions = Detector.collisions([
                ...enemies.map(x => [x, plate])
            ], engine);
        } else {
            collisions = Detector.collisions([
                [player, plate],
                ...enemies.map(x => [x, plate]),
                ...dynamicBodies.filter(({ bodyType }) => bodyType === "circle" || bodyType === "rectangle").map(x => [x, plate])
            ], engine);
        }
        const yDiff = plate.vertices[3].y - plate.vertices[0].y;
        if (collisions.some(collision => Math.abs(collision.tangent.x) > 0.9 && Math.abs(collision.tangent.y) < 0.1)) {
            if (yDiff > 5) {
                plate.vertices[0].y += plate.downStep;
                plate.vertices[1].y += plate.downStep;
            }
            plate.plateCooldown = 15;
        } else if (plate.plateCooldown < 1) {
            if (yDiff < 10) {
                plate.vertices[0].y -= plate.upStep;
                plate.vertices[1].y -= plate.upStep;
            } else {
                plate.vertices[0].y = plate.vertices[3].y - 10;
                plate.vertices[1].y = plate.vertices[3].y - 10;
            }
        }
        const amtToScale = 1 - ((yDiff - 5) / 5);
        plate.plateMove.forEach(({ to, x, y }) => {
            const p = platforms[to];
            Body.setPosition(p, { x: p.oldX + x * amtToScale, y: p.oldY + y * amtToScale })
        })
        plate.plateCooldown -= 1;
    })
    fill(0, 0, 255);
    grapplePoints.forEach(point => {
        drawCircle(point);
    });
    stroke(100);
    strokeWeight(3);
    enemyConstraints.forEach(constraint => {
        if (constraint.cUnbreakable) {
            stroke(255);
        } else {
            stroke(100);
        }
        drawConstraint(constraint);
    })
    strokeWeight(1);
    noStroke();
    fill(0, 255, 255);
    enemies.forEach(enemy => {
        if (enemy.enemyType === "square") {
            drawVertices(enemy.vertices);
        }
        enemy.enemyTick++;
        if (enemy.enemyTick % enemy.waitTime === 0) {
            Body.setVelocity(enemy, { x: enemy.velocity.x + enemy.enemySpeed * enemy.enemyDirection, y: enemy.velocity.y });
            enemy.canSwitch = true;
        }
        const collisions = Detector.collisions([...platforms.map(x => [x, enemy]), ...enemies.filter(x => x !== enemy).map(x => [x, enemy])], engine);
        if (collisions.map(x => x.tangent).filter(x => x).some(({ x, y }) => abs(y) > 0)) {
            enemy.enemyDirection *= -1;
        }
        [...platforms, ground].forEach(platform => {
            const collision = Detector.collisions([
                [enemy, platform]
            ], engine)[0];
            if (collision && collision.tangent.x === -1 && collision.tangent.y === 0) {
                if ((Math.max(...enemy.vertices.map(v => v.x)) > Math.max(...platform.vertices.map(v => v.x)) - 20 || Math.min(...enemy.vertices.map(v => v.x)) < Math.min(...platform.vertices.map(v => v.x)) + 20) && enemy.canSwitch) {
                    enemy.canSwitch = false;
                    Body.setVelocity(enemy, { x: enemy.velocity.x * -1, y: enemy.velocity.y });
                    enemy.enemyDirection *= -1;
                }
            }
        })
        const playerCollision = Detector.collisions([
            [enemy, player]
        ], engine)[0];
        if (playerCollision && enemy.enemySize > 20) {
            takeDamage((max(abs(enemy.velocity.x), 0.01) * enemy.enemySize) / 100);
            if (enemy.enemySize > 100) {
                takeDamage(1);
            }
            if (Math.abs(player.velocity.x) > 2.5 && enemy.enemyC !== undefined && !enemy.enemyC.cUnbreakable) {
                World.remove(engine.world, enemy.enemyC);
                enemyConstraints.splice(enemyConstraints.indexOf(enemy.enemyC), 1);
                enemy.enemyC = undefined;
            }
        }
        /**/
    });
    if (playerConstraint) {
        stroke(0, 0, 255);
        drawConstraint(playerConstraint);
    }
    fill(255);
    noStroke();
    drawCircle(player);
    fill(0);
    circle(player.position.x - 5 + clampAbs(player.velocity.x, 3), player.position.y - 2 + clampAbs(player.velocity.y, 3), 5);
    circle(player.position.x + 5 + clampAbs(player.velocity.x, 3), player.position.y - 2 + clampAbs(player.velocity.y, 3), 5);
    stroke(0);
    bezier(player.position.x - 3, player.position.y + 5, player.position.x, player.position.y + 5 + min(Math.abs(player.velocity.y), 5), player.position.x, player.position.y + 5 + min(Math.abs(player.velocity.y), 5), player.position.x + 3, player.position.y + 5)
    if (RIGHT && player.velocity.x < 5) {
        Body.setVelocity(player, { x: player.velocity.x + 1, y: player.velocity.y })
    } else if (LEFT && player.velocity.x > -5) {
        Body.setVelocity(player, { x: player.velocity.x - 1, y: player.velocity.y })
    }
    const collisions = Detector.collisions([
        [player, ground], ...platforms.map(x => [player, x]), ...plates.map(x => [player, x]), ...enemies.map(x => [player, x]), ...dynamicBodies.filter(({ bodyType }) => bodyType === "circle" || bodyType === "rectangle").map(x => [player, x])
    ], engine);
    if (JUMPING && collisions.some(c => c.tangent.x >= 0.25 && c.tangent.x <= 1 && c.tangent.y <= 0.75 && c.tangent.y >= -0.75) > 0) {
        Body.setVelocity(player, { x: player.velocity.x, y: player.velocity.y - 10 })
    }
    if (player.position.x > width) {
        level += 1;
        gainHealth(50);
        renderLevel(level);
        Body.setPosition(player, (levels[level - 1] && levels[level - 1].startPos) || { x: 25, y: height - 125 })
    } else if (player.position.x < 0) {
        Body.setPosition(player, { x: 0, y: player.position.y })
        Body.setVelocity(player, { x: 0, y: 0 })
    }
}

function keyPressed() {
    if (key === "ArrowRight") {
        RIGHT = true;
    }
    if (key === "ArrowLeft") {
        LEFT = true;
    }
    if (key === "ArrowUp") {
        JUMPING = true;
    }
    if (key.toLowerCase() === "g" && !playerConstraint) {
        grapplePoints.forEach(point => {
            if (dist(mouseX, mouseY, point.position.x, point.position.y) <= 10) {
                const c = Constraint.create({
                    bodyA: player,
                    bodyB: point,
                    stiffness: 0.001,
                    damping: 0.01,
                    length: 75,
                    type: "spring"
                });
                World.add(engine.world, c);
                playerConstraint = c;
            }
        })
    } else if (key.toLowerCase() === "g") {
        World.remove(engine.world, playerConstraint);
        playerConstraint = undefined;
    }
    if (key.toLowerCase() === "q") {
        renderLevel(level);
        Body.setPosition(player, (levels[level - 1] && levels[level - 1].startPos) || { x: 25, y: height - 125 })
    }
}

function keyReleased() {
    if (key === "ArrowRight") {
        RIGHT = false;
    }
    if (key === "ArrowLeft") {
        LEFT = false;
    }
    if (key === "ArrowUp") {
        JUMPING = false;
    }
}

function drawCircle(body) {
    circle(body.position.x, body.position.y, body.circleRadius * 2);
}

function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

function drawConstraint(c) {
    line(c.bodyA.position.x + c.pointA.x, c.bodyA.position.y + c.pointA.y, c.bodyB.position.x + c.pointB.x, c.bodyB.position.y + c.pointB.y);
}
const music = document.getElementById("music");
const music2 = document.getElementById("music2");
music.addEventListener('ended', function() {
    this.currentTime = 0;
    if (level === 3 || level === 5) {
        music2.play();
    } else {
        this.play();
    }
}, false);
music2.addEventListener('ended', function() {
    this.currentTime = 0;
    if (level === 3 || level === 5) {
        this.play();
    } else {
        music.play();
    }
}, false);
let firstTime = true;
window.onclick = () => {
    if (firstTime) {
        music.play();
        firstTime = false;
    }
}
window.onkeydown = () => {
    if (firstTime) {
        music.play();
        firstTime = false;
    }
}
let musicTick = 0;
setInterval(() => {
    musicTick += 0.0001;
    music.volume = Math.max(Math.abs(Math.sin(musicTick)), 0.3);
    music2.volume = Math.max(Math.abs(Math.sin(musicTick)), 0.3);
})
const pause = document.getElementById("pause");
pause.onclick = () => {
    if (music.paused) {
        music.play();
        pause.firstChild.classList.remove("fa-volume-off");
        pause.firstChild.classList.add("fa-volume-up");
    } else {
        music.pause();
        pause.firstChild.classList.remove("fa-volume-up");
        pause.firstChild.classList.add("fa-volume-off");
    }
}