// The title of the game to be displayed on the title screen
title = "BULLSEYE";

// The description, which is also displayed on the title screen
description = `
[Hold] To Steady Your Shot
`;

// The array of custom sprites
characters = [
`
   l
l   l
 lllll
 lllll
l   l
   l
`
];

// Game design variable container
const G = {
	WIDTH: 200,
	HEIGHT: 100,

    PLAYER_X_POS: 5,
    PLAYER_Y_POS: 10,
};

// Game runtime options
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isReplayEnabled: true,
};

// JSDoc comments for typing

/** @type {{arrow: Vector}} */
let player;
/** @type {Vector[]} */
let arrows;

/**
 * @typedef {{
 * pos: Vector,
 * }} Yellow_Target
 */

/**
 * @type { Yellow_Target [] }
 */
 let yellow_target;

/**
 * @typedef {{
 * pos: Vector,
 * }} Red_Target
 */

/**
 * @type { Red_Target [] }
 */
 let red_target;

/**
 * @typedef {{
 * pos: Vector,
 * }} Blue_Target
 */

/**
 * @type { Blue_Target [] }
 */
 let blue_target;


// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        arrows = [vec(G.PLAYER_X_POS, G.PLAYER_Y_POS)];
        player = { arrow: arrows[0]};    

        yellow_target = [];
        const posX = rnd(90, 110);
        const posY = rnd(20, 30);
        if (yellow_target.length === 0) {
            yellow_target.push({ pos: vec(posX, posY) })
        }

        red_target = [];
        if (red_target.length === 0) {
            red_target.push({ pos: vec(posX, posY + 4) })
            red_target.push({ pos: vec(posX, posY - 4) })
        }

        // blue_target = [];
        // if (blue_target.length === 0) {
        //     blue_target.push({ pos: vec(posX, posY + 4) })
        //     blue_target.push({ pos: vec(posX, posY - 4) })
        // }
    }

    if (arrows[0].x > 205) {
        end();
    }

    remove(arrows, (a) => {
        if (input.isPressed) {
            a.y -= 0.25;
        }
        a.x += 0.5;
        a.y += 0.1;
        color("black");
        char("a", a.x, a.y);
        return a.x > 210;
    });

    remove(yellow_target, (yt) => {
        color("yellow");
        const isCollidingwithYTarget = box(yt.pos, 2).isColliding.char.a;
        if (isCollidingwithYTarget) {
            color("light_black");
            particle(yt.pos);
            addScore(10);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
        }
        return (isCollidingwithYTarget);
    })

    remove(red_target, (rt) => {
        color("red");
        const isCollidingwithRTarget = box(rt.pos, 3).isColliding.char.a;
        if (isCollidingwithRTarget) {
            color("light_black");
            particle(rt.pos);
            addScore(5);
        }
        return (isCollidingwithRTarget);
    })

    // remove(blue_target, (bt) => {
    //     color("blue");
    //     const isCollidingwithBTarget = box(bt.pos, 2).isColliding.char.a;
    //     if (isCollidingwithBTarget) {
    //         color("light_black");
    //         particle(bt.pos);
    //         addScore(2);
    //     }
    //     return (isCollidingwithBTarget);
    // })
}