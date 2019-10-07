import { Scene } from 'phaser';

import mapJson from './assets/ship.json';
import tiles from './assets/Tiles.png';
import lightmap from './assets/lightmap.png';
import player_acting from './assets/Dave acting.png'
import critter_eating from './assets/Critter.png'
import door from './assets/door.png'
import assets from './assets/Assets.png'
import lever from './assets/lever.png'
import lights from './assets/Lights.png'
import furniture from './assets/Furniture.png'
import bigAssets from './assets/Big-assets.png'
import smallAssets from './assets/Small-assets.png'
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles.min.js';

import lightSwitchSound from './assets/sounds/Okt. 06, 830873-light-switch.ogg';
import lightSwitchSoundAlternative from './assets/sounds/Okt. 06, 830873-light-switch-alternative.ogg';
import walkingWood1 from './assets/sounds/Okt. 06, 508575-steps-wood.ogg';
import walkingWood2 from './assets/sounds/Okt. 06, 022498-walking-wood.ogg';
import walkingWood3 from './assets/sounds/Okt. 06, 969136-walking-wood-alternative.ogg';
import walkingMetal1 from './assets/sounds/Okt. 06, 469754-walking-metal.ogg';
import doorSwoosh from './assets/sounds/Okt. 06, 259500-door-shush.ogg';
import oxygen from './assets/sounds/Okt. 06, 581718-oxigen.ogg';
import generatorNoise1 from './assets/sounds/Okt. 07, 830680-generator-noise.ogg';
import generatorNoise2 from './assets/sounds/Okt. 07, 128891-generator-noise-alternative.ogg';

import { PLAYER_TILESET_KEY } from './entities/player.js';
import { CRITTER_KEY } from './entities/critter.js';
import Player from './entities/player.js';
import Critter from './entities/critter.js';

import dialog from './dialog/dialog.js';

import stateMachine from './stateMachine.js';

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		this.playerCollider = null;
		this.sounds = {};
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		this.load.image('tiles', tiles);
		this.load.tilemapTiledJSON('map', mapJson);
		this.load.spritesheet(PLAYER_TILESET_KEY,
			player_acting,
			{ frameWidth: 32, frameHeight: 32 }
		);
		this.load.spritesheet(CRITTER_KEY,
			critter_eating,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('assets',
			assets,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('door',
			door,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('lever',
			lever,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('lights',
			lights,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('smallAssets',
			smallAssets,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('bigAssets',
			bigAssets,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.spritesheet('furniture',
			furniture,
			{ frameWidth: 16, frameHeight: 16 }
		);
		this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
		
		this.load.image('lightmap', lightmap);

		this.load.audio('light-switch-1', lightSwitchSound);
		this.load.audio('light-switch-2', lightSwitchSoundAlternative);
		this.load.audio('walking-wood-1', walkingWood1);
		this.load.audio('walking-wood-2', walkingWood2);
		this.load.audio('walking-wood-3', walkingWood3);
		this.load.audio('walking-metal-1', walkingMetal1);
		this.load.audio('door-swoosh-1', doorSwoosh);
		this.load.audio('oxygen', oxygen);
		this.load.audio('generator-noise-1', generatorNoise1);
		this.load.audio('generator-noise-2', generatorNoise2);
	}

	initializeObjects(tilemap) {
		this.speechTriggers = this.physics.add.group();
		this.doorTriggers = this.physics.add.group();
		this.levers = this.physics.add.group();
		this.audioAreas = this.physics.add.group();

		const commonSpritePostProcessing = (sprite, obj) => {
			sprite.setDisplaySize(obj.width, obj.height);
			sprite.setOrigin(0, 0);
			sprite.name = obj.name;
			// copy custom properties
			if (obj.properties) {
				obj.properties.forEach(prop => {
					sprite.setData(prop.name, prop.value);
				});
			}
		}

		tilemap.getObjectLayer('objects').objects.forEach(obj => {
			if (obj.type === "door-trigger") {
				const sprite = this.physics.add.sprite(obj.x, obj.y, null);
				commonSpritePostProcessing(sprite, obj);
				sprite.depth = -10;
				this.doorTriggers.add(sprite);
			}
			else if (obj.type === "speech-trigger") {
				const sprite = this.physics.add.sprite(obj.x, obj.y, null);
				commonSpritePostProcessing(sprite, obj);
				sprite.depth = -10;
				this.speechTriggers.add(sprite);
			}
			else if (obj.type === "lever") {
				// a freaking 8 year old bug in tiled drove me mad…
				// https://github.com/bjorn/tiled/issues/91
				const posY = obj.gid ? obj.y - obj.height : obj.y;
				const sprite = this.physics.add.sprite(obj.x, posY, 'lever');
				commonSpritePostProcessing(sprite, obj);
				this.levers.add(sprite);
			}
		});
		
		tilemap.getObjectLayer('soundAreas').objects.forEach(obj => {
			if (obj.type === "audio-area") {
				const sprite = this.physics.add.sprite(obj.x, obj.y, null);
				commonSpritePostProcessing(sprite, obj);
				sprite.depth = -10;
				this.audioAreas.add(sprite);
			}
		});
	}
	
	create() {
		this.physics.world.TILE_BIAS = 8;
		this.physics.world.OVERLAP_BIAS = 1; // we don't want to automatically resolve overlaps
		
		const map = this.make.tilemap({ key: 'map' });
		const tileset = map.addTilesetImage('Tiles', 'tiles');
		const animatedTileset = map.addTilesetImage('Assets', 'assets');
		const lightsTileset = map.addTilesetImage('Lights', 'lights');
		const doorTileset = map.addTilesetImage('door');
		const furnitureTileset = map.addTilesetImage('Furniture', 'furniture');
		const smallAssetsTileset = map.addTilesetImage('Small-assets', 'smallAssets');
		const bigAssetsTileset = map.addTilesetImage('Big-assets', 'bigAssets');

		this.walkableLayer = map.createStaticLayer('floor', tileset, 0, 0);
		
		const wallLayer = map.createStaticLayer('walls', tileset, 0, 0);
		wallLayer.setCollisionBetween(1, 999);
		const furnitureLayer = map.createStaticLayer('furniture', furnitureTileset, 0, 0);
		furnitureLayer.setCollisionBetween(1, 999);

		this.doorLayer = map.createDynamicLayer('doors', doorTileset, 0, 0);
		this.doorLayer.setCollisionByProperty({ closed: true });
		this.animatedLayer = map.createDynamicLayer('animated', animatedTileset, 0, 0);
		this.animatedLayer.setCollisionBetween(1, 999);
		this.lampLayer = map.createDynamicLayer('lamps', lightsTileset, 0, 0);
		this.smallAssetsLayer = map.createDynamicLayer('small-assets', smallAssetsTileset, 0, 0);
		this.bigAssetsLayer = map.createDynamicLayer('big-assets', bigAssetsTileset, 0, 0);
		this.brokenPipesLayer = map.createDynamicLayer('broken-pipes', animatedTileset, 0, 0);


		this.emergencyLightsBedroomLayer = map.createDynamicLayer('emergency-lights-bedroom', lightsTileset, 0, 0);
		this.emergencyLightsBedroomLayer.visible = false;

        this.sys.animatedTiles.init(map);

		this.player = new Player(this);
		this.physics.add.collider(this.player.sprite, wallLayer);
		this.physics.add.collider(this.player.sprite, furnitureLayer);
		this.physics.add.collider(this.player.sprite, this.doorLayer);
		this.physics.add.collider(this.player.sprite, this.animatedLayer);

		this.critter = new Critter(this);

		this.initializeObjects(map);

		dialog.init(this.Dialog, this, this.player);
		stateMachine.init(this.player);
		this.cameras.main.startFollow(this.player.sprite);
		const lightMask = this.make.sprite({
			key: 'lightmap',
			x: 380,
			y: 220,
			add: false
		});

		lightMask.update = () => {
			lightMask.x = Math.round(32 + this.game.config.width - this.cameras.main.scrollX);
			lightMask.y = Math.round(96 + this.game.config.height - this.cameras.main.scrollY);
		}
		this.lightMask = lightMask;

		// this.cameras.main.setMask(new Phaser.Display.Masks.BitmapMask(this, lightMask));

		this.sounds.lightSwitch = this.sound.add('light-switch-1');
		this.sounds.lightSwitchAlternative = this.sound.add('light-switch-2');
		this.sounds.walkingWood1 = this.sound.add('walking-wood-1');
		this.sounds.walkingWood2 = this.sound.add('walking-wood-2');
		this.sounds.walkingWood3 = this.sound.add('walking-wood-3');
		this.sounds.walkingMetal1 = this.sound.add('walking-metal-1');
		this.sounds.doorSwoosh1 = this.sound.add('door-swoosh-1');
		this.sounds.oxygen = this.sound.add('oxygen');
		this.sounds.generatorNoise = this.sound.add('generator-noise-2');

		dialog.show('speech-awakening');
	}

	update(time, delta) {
		stateMachine.update();
		this.player.update();
		this.critter.update();
		this.lightMask.update();
	}
}