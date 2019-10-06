import stateMachine from './stateMachine.js';
import { getPhaserTileIndexFromTiledGid } from './dynamic-tilemap-layer-helper.js';

// I tried to remove these hardcoded Tile Ids, but failed.
// Problem is that it was not trivial for me to get a specific TileObject 
// based on a specific property (eg open=true) from the tilesetlayer.
// 
// Anyway this works for now, and since the 'doors' layer only has these 
// two tiles, I hope there won't be a problem in the future.
const TILED_TILE_ID_DOOR_CLOSED = 0;
const TILED_TILE_ID_DOOR_OPENED = 1;

function setToOpenDoorTile(x, y) {
    const doorLayer = stateMachine.player.scene.doorLayer;
    const tileIndexDoorOpened = getPhaserTileIndexFromTiledGid(doorLayer, TILED_TILE_ID_DOOR_OPENED);
    const tile = doorLayer.putTileAt(tileIndexDoorOpened, x, y);
    tile.setCollision(false);
}
function setToClosedDoorTile(x, y) {
    const doorLayer = stateMachine.player.scene.doorLayer;
    const tileIndexDoorClosed = getPhaserTileIndexFromTiledGid(doorLayer, TILED_TILE_ID_DOOR_CLOSED);
    const tile = doorLayer.putTileAt(tileIndexDoorClosed, x, y);
    tile.setCollision(true);
}

const doors = {
    "door-001": {
        open: false,
        locked: false, // so far unused
        tiles: [
            [37, 8],
            [38, 8]
        ]
    }
}

export function ensureDoorOpen(identifier) {
    const door = doors[identifier];
    if (door.open) {
        return;
    }

    door.tiles.forEach((tile) => setToOpenDoorTile(tile[0], tile[1]));
    stateMachine.player.scene.sounds.doorSwoosh1.play();
    door.open = true;
}

export function ensureAllDoorsClosed() {
    for (let [identifier, state] of Object.entries(doors)) {
        if (state.open) {
            state.tiles.forEach((tile) => setToClosedDoorTile(tile[0], tile[1]));
            stateMachine.player.scene.sounds.doorSwoosh1.play();
            state.open = false;
        }
    }
}
