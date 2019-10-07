import stateMachine from './stateMachine.js';
import dialog from './dialog/dialog.js';
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
    "door-oxygen": {
        open: false,
        tiles: [
            [37, 8],
            [38, 8]
        ],
        locked: true
    },
    "door-bedroom": {
        open: false,
        locked: false,
        tiles: [
            [28, 15],
            [29, 15]
        ]
    },
    "door-lift": {
        open: false,
        locked: true,
        tiles: [
            [24, 11],
            [24, 12]
        ]
    },
    "door-004": {
        open: false,
        locked: false,
        tiles: [
            [33, 20],
            [34, 20]
        ]
    },
    "door-005": {
        open: false,
        locked: false,
        tiles: [
            [19, 20],
            [20, 20]
        ]
    },
    "door-generatorroom": {
        open: false,
        locked: true,
        tiles: [
            [37, 28],
            [38, 28]
        ]
    },
    "door-bridge": {
        open: false,
        locked: false,
        tiles: [
            [15, 17],
            [15, 18]
        ]
    }
}

function playSoundEffect() {
    stateMachine.player.scene.sounds.doorSwoosh1.play({volume: 0.1});
}

export function lockDoor(name, locked) {
    doors[name].locked = locked;
}

export function ensureDoorOpen(identifier) {
    const door = doors[identifier];
    if (door.open) {
        return;
    }
    if (door.locked) {
        if (door.lockedDialog && !door.alreadySeenLockedDialog) {
            dialog.show(door.lockedDialog);
            door.alreadySeenLockedDialog = true;
        }
        return;
    }

    door.tiles.forEach((tile) => setToOpenDoorTile(tile[0], tile[1]));
    playSoundEffect();
    door.open = true;
}

export function ensureAllDoorsClosed() {
    for (let [identifier, state] of Object.entries(doors)) {
        if (state.open) {
            state.tiles.forEach((tile) => setToClosedDoorTile(tile[0], tile[1]));
            playSoundEffect();
            state.open = false;
        }
        state.alreadySeenLockedDialog = false;
    }
}
