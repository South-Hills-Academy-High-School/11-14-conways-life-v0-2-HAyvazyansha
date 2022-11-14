namespace SpriteKind {
    export const cursor = SpriteKind.create()
    export const newCursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridRow += -1
    cursorY += -10
    drawGrid()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    grid[cursorGridRow][cursorGridCol] = grid[cursorGridRow][cursorGridCol] * -1 + 1
    drawGrid()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridCol += -1
    cursorX += -10
    drawGrid()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridCol += 1
    cursorX += 10
    drawGrid()
})
function drawGrid () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    gridSprites = []
    currentY = 0
    for (let row of grid) {
        currentX = 0
        for (let gridSpace of row) {
            if (gridSpace == 1) {
                gridSprite = sprites.create(img`
                    f f f f f f f f f f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f f f f f f f f f f 
                    `, SpriteKind.Player)
                gridSprite.left = currentX
                gridSprite.top = currentY
                gridSprites.push(gridSprite)
            }
            currentX += 10
        }
        currentY += 10
    }
    cursor.left = cursorX
    cursor.top = cursorY
    neighborCountSprite.right = cursorX
    neighborCountSprite.bottom = cursorY
    neighborCountSprite.setText(convertToText(countNeighbors(cursorGridRow, cursorGridCol)))
}
function countNeighbors (currentRow: number, currentCol: number) {
    NeighboCount = 0
    if (currentRow == 0 && currentCol == 0) {
        NeighboCount += grid[11][15]
    } else if (currentRow == 0) {
        NeighboCount += grid[11][currentCol - 1]
    } else {
        NeighboCount += grid[currentRow - 1][currentCol - 1]
    }
    if (currentRow == 0) {
        NeighboCount += grid[11][currentCol]
    } else {
        NeighboCount += grid[currentRow - 1][currentCol - 0]
    }
    if (currentRow == 0 && currentCol == 15) {
        NeighboCount += grid[11][0]
    } else if (currentRow == 0) {
        NeighboCount += grid[11][currentCol + 1]
    } else {
        NeighboCount += grid[currentRow - 1][currentCol + 1]
    }
    if (currentRow == 0) {
        NeighboCount += grid[currentRow][0]
    } else {
        NeighboCount += grid[currentRow - 0][currentCol + 1]
    }
    return NeighboCount
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridRow += 1
    cursorY += 10
    drawGrid()
})
let NeighboCount = 0
let gridSprite: Sprite = null
let currentX = 0
let currentY = 0
let gridSprites: Sprite[] = []
let neighborCountSprite: TextSprite = null
let cursorY = 0
let cursorX = 0
let cursorGridRow = 0
let cursorGridCol = 0
let cursor: Sprite = null
let grid: number[][] = []
grid = []
for (let row = 0; row <= 11; row++) {
    grid.push([])
    for (let column = 0; column <= 15; column++) {
        grid[row].push(0)
    }
}
cursor = sprites.create(img`
    3 3 3 3 . . 3 3 3 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    . . . . . . . . . . 
    . . . . . . . . . . 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 3 3 3 . . 3 3 3 3 
    `, SpriteKind.newCursor)
cursorGridCol = 0
cursorGridRow = 0
cursorX = 0
cursorY = 0
cursor.z = 10
neighborCountSprite = textsprite.create("")
cursor.z = 10
drawGrid()
