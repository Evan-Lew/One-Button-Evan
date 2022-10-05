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
 * @type { Yellow_Target }
 */
let yellow_target;

// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        player = {
            pos: vec(G.PLAYER_X_POS, G.PLAYER_Y_POS)
        };
        yellow_target = {
            pos: vec(100, 25)
        };
	}

    // Drag the arrow down
    G.PLAYER_Y_POS += 0.1;
    player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);

    // Move the arrow to the right
    G.PLAYER_X_POS += 0.5;
    player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);


    // // Move the arrow to the left
    // if (G.PLAYER_Y_POS > 57) {
    //     G.PLAYER_X_POS -= 1;
    //     player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);
    // }

    // // End the game if frog reaches the left border
    // if (G.PLAYER_X_POS <= -5){
    //     end();
    // }

    // ONE BUTTON MECHANIC
    if (input.isPressed && G.PLAYER_Y_POS > 5) {
        G.PLAYER_Y_POS -= 0.25;
        player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);
    }

    // Keep the player on the screen
    // player.pos.clamp(-5, G.WIDTH, 5, 57);

    // Yellow_Target sprite details
    color ("yellow");
    box(yellow_target.pos, 2)
    
    // Player/Arrow sprite details
    color ("black");
    char("a", player.pos);

    // Checking for arrow collision with Yellow_Target
    const isCollidingWithYTarget = char("a", player.pos).isColliding.rect.yellow;

    if (isCollidingWithYTarget) {
        color("light_black");
        particle(player.pos);
        //end()
    }
}

//---------------------------------------------------------------------------------------------------------

// // The title of the game to be displayed on the title screen
// title = "FROG HOP";

// // The description, which is also displayed on the title screen
// description = `
// [Hold] To Climb
// `;

// // The array of custom sprites
// characters = [
// `
//  lggl
//  gggg
// ggGGgg
//  gGGg
//  g  g
// g    g
// `,`
//  l  l
//  gggg
// ggRRgg"
//  gggg
//  gGGg
// g    g
// `,`
//   l l
//  ggggg
// gggRgg
// ggggg
// g   g
//  g   g
// `
// ];

// // Game design variable container
// const G = {
// 	WIDTH: 200,
// 	HEIGHT: 60,

//     PLAYER_X_POS: 100,
//     PLAYER_Y_POS: 50,

//     RAIN_SPEED_MIN: 0.5,
// 	RAIN_SPEED_MAX: 1.0
// };

// // Game runtime options
// options = {
// 	viewSize: {x: G.WIDTH, y: G.HEIGHT},
//     isReplayEnabled: true,
// };

// // JSDoc comments for typing
// /**
//  * @typedef {{
//  * pos: Vector,
//  * speed: number
//  * }} Rain
//  */

// /**
//  * @type { Rain [] }
//  */
// let rain_drops;

// /**
//  * @typedef {{
//  * pos: Vector,
//  * }} Player
//  */

// /**
//  * @type { Player }
//  */
// let player;

// // The game loop function
// function update() {
//     // The init function running at startup
// 	if (!ticks) {
// 		rain_drops = times(50, () => {
//             // Random number generator function
//             const posX = rnd(0, G.WIDTH);
//             const posY = rnd(0, G.HEIGHT);
//             // An object of type Rain with appropriate properties
//             return {
//                 // Creates a Vector
//                 pos: vec(posX, posY),
//                 // More RNG
//                 speed: rnd(G.RAIN_SPEED_MIN, G.RAIN_SPEED_MAX)
//             };
//         });

//         player = {
//             pos: vec(G.PLAYER_X_POS, G.PLAYER_Y_POS)
//         };
// 	}

//     // Update for Rain
//     rain_drops.forEach((r) => {
//         // Move the rain downwards
//         r.pos.y += r.speed;


//         // Bring the rain drop back to top once it's past the bottom of the screen
//         if (r.pos.y > G.HEIGHT) r.pos.y = 0;

//         // Choose a color to draw
//         color("light_blue");
//         // Draw the rain as a square of size 2
//         box(r.pos, 2);
//     });

//     // Drag the frog down
//     G.PLAYER_Y_POS += 0.1;
//     player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);

//     // Move the frog to the left
//     if (G.PLAYER_Y_POS > 57) {
//         G.PLAYER_X_POS -= 1;
//         player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);
//     }

//     // End the game if frog reaches the left border
//     if (G.PLAYER_X_POS <= -5){
//         end();
//     }

//     // ONE BUTTON MECHANIC
//     if (input.isPressed && G.PLAYER_Y_POS > 5) {
//         G.PLAYER_Y_POS -= 0.25;
//         player.pos = vec(G.PLAYER_X_POS, G.PLAYER_Y_POS);
//     }

//     // Keep the player on the screen
//     player.pos.clamp(-5, G.WIDTH, 5, 57);

//     // Player details
//     color ("black");
//     char("c", player.pos);
// }