// The title of the game to be displayed on the title screen
title = "BULLSEYE";

// The description, which is also displayed on the title screen
description = `
[Hold] To Steady Your Shot
`;

// The array of custom sprites
characters = [
`


llllll



`,`
y
y




`,`
r
r
r
r


`,`
b
b
b
b
b
b
`,`
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
    //theme: "shapeDark",
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

/** @type { Yellow_Target [] } */
 let yellow_target;

/**
 * @typedef {{
 * pos: Vector,
 * }} Red_Target_Up
 */

/** @type { Red_Target_Up [] } */
 let red_target_up;

/**
 * @typedef {{
 * pos: Vector,
 * }} Red_Target_Down
 */

/** @type { Red_Target_Down [] } */
 let red_target_down;

/**
 * @typedef {{
 * pos: Vector,
 * }} Blue_Target_Up
 */

/** @type { Blue_Target_Up [] } */
 let blue_target_up;

/**
 * @typedef {{
 * pos: Vector,
 * }} Blue_Target_Down
 */

/** @type { Blue_Target_Down [] } */
 let blue_target_down;

// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        arrows = [vec(G.PLAYER_X_POS, G.PLAYER_Y_POS)];
        player = { arrow: arrows[0]};    

        // Generate the center target position
        // const posX = rnd(100, 195);
        // const posY = rnd(20, 80);
        const posX = 100;
        const posY = 50;
        
        yellow_target = [];
        if (yellow_target.length === 0) {
            yellow_target.push({ pos: vec(posX, posY) })
        }

        red_target_up = [];
        if (red_target_up.length === 0) {
            red_target_up.push({ pos: vec(posX - 1, posY - 5) })
        }
        red_target_down = [];
        if (red_target_down.length === 0) {
            red_target_down.push({ pos: vec(posX - 1, posY + 3) })
        }

        blue_target_up = [];
        if (blue_target_up.length === 0) {
            blue_target_up.push({ pos: vec(posX - 2, posY - 12) })
        }
        blue_target_down = [];
        if (blue_target_down.length === 0) {
            blue_target_down.push({ pos: vec(posX - 2, posY + 8) })
        }
    }

    // End the game if the arrow passes the right border
    if (arrows[0].x > 205) {
        end();
    }

    // Draw the arrow
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

    // Yellow_Target collision
    remove(yellow_target, (yt) => {
        color("black")
        const isCollidingwithYTarget = char("b", yt.pos).isColliding.char.a;
        if (isCollidingwithYTarget) {
            color("light_black");
            particle(yt.pos);
            addScore(10);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            yellow_target.push({ pos: vec(posX, posY) })
            red_target_up.pop();
            red_target_up.push({ pos: vec(posX - 1, posY - 5)})
            red_target_down.pop();
            red_target_down.push({ pos: vec(posX - 1, posY + 3)})
            blue_target_up.pop();
            blue_target_up.push({ pos: vec(posX - 2, posY - 12)})
            blue_target_down.pop();
            blue_target_down.push({ pos: vec(posX - 2, posY + 8)})
        }
        return (isCollidingwithYTarget);
    })

    // Red_Target Up and Down collisions
    remove(red_target_up, (rtu) => {
        color("black")
        const isCollidingwithRTargetUp = char("c", rtu.pos).isColliding.char.a;
        if (isCollidingwithRTargetUp) {
            color("light_black");
            particle(rtu.pos);
            addScore(5);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            red_target_up.push({ pos: vec(posX - 1, posY - 5)})
            yellow_target.pop();
            yellow_target.push({ pos: vec(posX, posY) })
            red_target_down.pop();
            red_target_down.push({ pos: vec(posX - 1, posY + 3)})
            blue_target_up.pop();
            blue_target_up.push({ pos: vec(posX - 2, posY - 12)})
            blue_target_down.pop();
            blue_target_down.push({ pos: vec(posX - 2, posY + 8)})
        }
        return (isCollidingwithRTargetUp);
    })

    remove(red_target_down, (rtd) => {
        color("black")
        const isCollidingwithRTargetDown = char("c", rtd.pos).isColliding.char.a;
        if (isCollidingwithRTargetDown) {
            color("light_black");
            particle(rtd.pos);
            addScore(5);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            red_target_down.push({ pos: vec(posX - 1, posY + 3)})
            yellow_target.pop();
            yellow_target.push({ pos: vec(posX, posY) })
            red_target_up.pop();
            red_target_up.push({ pos: vec(posX - 1, posY - 5)})
            blue_target_up.pop();
            blue_target_up.push({ pos: vec(posX - 2, posY - 12)})
            blue_target_down.pop();
            blue_target_down.push({ pos: vec(posX - 2, posY + 8)})
        }
        return (isCollidingwithRTargetDown);
    })

    remove(blue_target_up, (btu) => {
        color("black")
        const isCollidingwithBTargetUp = char("d", btu.pos).isColliding.char.a;
        if (isCollidingwithBTargetUp) {
            color("light_black");
            particle(btu.pos);
            addScore(1);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            blue_target_up.push({ pos: vec(posX - 2, posY - 12)})
            yellow_target.pop();
            yellow_target.push({ pos: vec(posX, posY) })
            red_target_up.pop();
            red_target_up.push({ pos: vec(posX - 1, posY - 5)})
            red_target_down.pop();
            red_target_down.push({ pos: vec(posX - 1, posY + 3)})
            blue_target_down.pop();
            blue_target_down.push({ pos: vec(posX - 2, posY + 8)})
        }
        return (isCollidingwithBTargetUp);
    })

    remove(blue_target_down, (btd) => {
        color("black")
        const isCollidingwithBTargetDown = char("d", btd.pos).isColliding.char.a;
        if (isCollidingwithBTargetDown) {
            color("light_black");
            particle(btd.pos);
            addScore(5);
            arrows.pop();
            arrows.push(vec(G.PLAYER_X_POS, G.PLAYER_Y_POS));
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            blue_target_down.push({ pos: vec(posX - 2, posY + 8)})
            yellow_target.pop();
            yellow_target.push({ pos: vec(posX, posY) })
            red_target_up.pop();
            red_target_up.push({ pos: vec(posX - 1, posY - 5)})
            red_target_down.pop();
            red_target_down.push({ pos: vec(posX - 1, posY + 3)})
            blue_target_up.pop();
            blue_target_up.push({ pos: vec(posX - 2, posY - 12)})
        }
        return (isCollidingwithBTargetDown);
    })
}