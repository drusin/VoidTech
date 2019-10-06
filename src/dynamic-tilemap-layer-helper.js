// For some stupid reason (probably caused by me), tiled and phaser use different "tileid"s.
// Phaser uses index that is unique over all layers and tiled uses ids that are unique in the layers.
// So (layer 3 tile 2) has id 2 in tiled, but 57 in phaser, since there were 55 tiles in the previous layers.
// This hacky function tries to convert tiled to phaser indices.
export function getPhaserTileIndexFromTiledGid(layer, gid) {
    const tileIndicesOfLayer = Object.keys(layer.gidMap).map(index => parseInt(index)).sort();
    return tileIndicesOfLayer[gid];
}

// export function getTiledIdFromPhaserTileIndex(layer, index) {
    // const tileIndicesOfLayer = Object.keys(layer.gidMap).map(index => parseInt(index));
    // return tileIndicesOfLayer.indexOf(index);
// }