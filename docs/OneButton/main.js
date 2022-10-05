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
};

// JSDoc comments for typing
/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * }} Yellow_Target
 */

/**
 * @type { Yellow_Target [] }
 */
let yellow_target;

// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        player = {
            pos: vec(G.PLAYER_X_POS, G.PLAYER_Y_POS)
        };   

        yellow_target = [];

        if (yellow_target.length === 0) {
            const posX = rnd(90, 110);
            const posY = rnd(20, 30);
            yellow_target.push({ pos: vec(posX, posY) })
            yellow_target.push({ pos: vec(posX, posY) })
        }
    }

    yellow_target.forEach((yt) => {
        color("yellow");
        box(yt.pos, 2);
    })

    // Drag the arrow down
    G.PLAYER_Y_POS += 0.1;
    player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);

    // Move the arrow to the right
    G.PLAYER_X_POS += 0.5;
    player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);

    // ONE BUTTON MECHANIC
    if (input.isPressed) {
        G.PLAYER_Y_POS -= 0.25;
        player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);
    }

    // Player/Arrow sprite details
    color ("black");
    char("a", player.pos);

    remove(yellow_target, (yt) => {
        const isCollidingwithYTarget = char("a", player.pos).isColliding.rect.yellow;
        //const isCollidingwithYTarget = box(yt.pos, 2).isColliding.char.a;
        if (isCollidingwithYTarget) {
            color("light_black");
            particle(yt.pos);
        }
        return (isCollidingwithYTarget);
    })
}
