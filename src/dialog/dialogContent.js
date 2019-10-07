import dialog from './dialog.js';
import stateMachine, { STATES } from '../stateMachine';
import { lockDoor } from '../doors.js';

const content = {
    "speech-001": {
        "text": "Hello Dave!<br>2nd line<br>3rd line<br>4 line<br>5th line",
        "speaker": "lisa",
        "buttons": [
            {
                "text": "I want to hear more",
                "action": () => dialog.show('speech-003')
            },
            {
                "text": "just explode, please",
                "action": () => stateMachine.player.sprite.x -= 20
            },
            {
                "text": "leave me alone"
            }
        ]
    },
    "speech-002": {
        "text": "What can I do for you?",
        "speaker": "lisa",
        "action": () => alert('always happens after this dialog')
    },
    "speech-003": {
        "text": "I don't have anything more to tell you.",
        "speaker": "lisa"
    },
    "speech-004": {
        "text": "Sounds like a heavy door just moved.",
        "speaker": "dave"
    },
	"speech-awakening": {
        "text": "Where am I? I don’t remember anything…<br>Hello? Anybody there?<br>Maybe the computer can give me some answers.",
		"speaker": "dave",
		"action": () => { 
			stateMachine.player.scene.daveLying.visible = false;
			stateMachine.player.sprite.visible = true;
		}
    },
    "pc-bedroom": {
        "text": "OXYGEN LEVEL LOW!<br>OXYGEN LEVEL LOW!<br>OXYGEN LEVEL LOW!<br>OXYGEN LEVEL LOW!<br>OXYGEN LEVEL LOW!",
        "speaker": "lisa",
        "action": (trigger) => {
			trigger.setData('action', 'pc-bedroom2');
			lockDoor('door-oxygen', false);
            dialog.show('speech-oxygen-level-low-1');
        }
    },
	"speech-oxygen-level-low-1": {
		"text": "Shit. What’s happening here?",
        "speaker": "dave",
        "action": () => dialog.show('speech-oxygen-level-low-2')
		},
	"speech-oxygen-level-low-2": {
		"text": "Hello Dave. Welcome to Lisa’s Landing. You’ve been chosen to help us survive.<br>As you can see, the oxygen levels are getting too low.<br>Please go to the oxygen control room and fix the problem.",
        "speaker": "lisa",
        "buttons": [
            {
                "text": "Turn on emergency lights",
                "action": () => {
					stateMachine.player.scene.emergencyLightsBedroomLayer.visible = true;
					stateMachine.player.scene.setLightmask('bedroom-emergency');
                    dialog.show('speech-oxygen-level-low-3');
                }
            },
        ]
    },
	"speech-oxygen-level-low-3": {
		"text": "How does the voice know who I am?<br>I guess I should keep following the emergency lights to the oxygen control room.",
		"speaker": "dave"
    },
    "pc-bedroom2": {
        "text": "Dave, fix the oxygen levels. Please.",
        "speaker": "lisa",
        "action": () => dialog.show('speech-oxygen-level-low-3')
    },
	"speech-fix-leak-1": {
		"text": "One of the pipes seems to have a leak. I need to find something to cover the hole.",
		"speaker": "dave",
		"action": () => dialog.show('speech-fix-leak-2')
	},
	"speech-fix-leak-2": {
		"text": "Why don’t you look in the cabinet next to the computer for something useful?",
		"speaker": "lisa",
		"action": () => dialog.show('speech-fix-leak-3')
	},
	"speech-fix-leak-3": {
		"text": "Wait, you can hear me?",
		"speaker": "dave",
		"action": () => dialog.show('speech-fix-leak-4')
	},
	"speech-fix-leak-4": {
		"text": "Yes. Please deal with the leak, Dave.",
		"action": () => content['bedroom-drawer'].proxyFor = 'bedroom-drawer-001',
		"speaker": "lisa"
	},
	"repair-leak-generic": {
		"text": "I need something to fix this up.",
		"speaker": "dave"
	},
	"repair-leak-ducttape": {
		"text": "This shall do...",
		"speaker": "dave",
		"action": () => {
			stateMachine.player.scene.brokenPipesLayer.visible = false;
			stateMachine.player.scene.setLightmask('all-emergency');
			dialog.show('speech-fixed-leak');
		}
	},
	"bedroom-drawer": {
		"proxyFor": "no-time-for-this"
	},
	"no-time-for-this": {
		"text": "I don't have time for this right now.",
		"speaker": "dave"
	},
	"bedroom-drawer-001": {
		"text": "A picure and a roll of duct tape...",
		"speaker": "dave",
		"buttons": [
			{
				"text": "Look at the picture",
				"action": () => dialog.show('no-time-for-this')
			},
			{
				"text": "Take the duct tape",
				"action": () => dialog.show('bedroom-drawer-took-ductape')
			}
		]
	},
	"bedroom-drawer-took-ductape": {
		"text": "This will be useful.",
		"speaker": "dave",
		"action": () => content['repair-leak-generic'].proxyFor = 'repair-leak-ducttape'
	},
	"speech-fixed-leak": {
		"text": "Thanks Dave. Now we need to get the generators up and running.<br>Please follow the emergency lights to the generator room.",
		"action": () => {
			stateMachine.player.scene.music.setTrack2();
			stateMachine.player.scene.emergencyLightsGeneratorLayer.visible = true;
			lockDoor('door-bedroom', false);
			lockDoor('door-004', false);
			lockDoor('door-generatorroom', false);
		},
		"speaker": "lisa"
	},
	"speech-fix-generators-1": {
		"text": "One of the generators is losing coolant fluid.<br>The coolant temperature cannot reach maximum level.",
		"speaker": "lisa",
		"action": () => dialog.show('speech-fix-generators-2')
		},
	"speech-fix-generators-2": {
		"text": "If it’s losing coolant fluid, then there must be a leak somewhere.",
		"speaker": "dave",
		"action": () => dialog.show('speech-fix-generators-3')
		},
	"speech-fix-generators-3": {
		"text": "The generators are the source of power for the entire control system.<br>We should prevent a generator outage from happening again.<br>Please locate the faulty generator.",
		"speaker": "lisa",
		"action": () => content["faulty-generator"].proxyFor = "faulty-generator-001"
		},
	"faulty-generator": {
		"proxyFor": "no-time-for-this"
	},
	"faulty-generator-001": {
		"text": "This one is broken. Lisa, can we somehow cut this generator from the grid?",
		"speaker": "dave",
		"action": () => dialog.show('speech-fix-generators-4')
	},
	"speech-fix-generators-4": {
		"text": "I have enabled the generator circuit setup.<br>Using the console, you should be able to cut this generator off.",
		"speaker": "lisa",
		"action": () => content['generator-console'].proxyFor = 'generator-console-001'
	},
	"entered-generator-room": {
		"speaker": "lisa",
		"text": "At the end of the room there is a console. Use it to restart the generators"
	},
	"generator-console": {
		"text": "Generator control console",
		"speaker": "lisa",
		"buttons": [
			{
				"text": "Power on",
				"action": () => {
					stateMachine.generatorsOn = true;
					stateMachine.player.scene.generatorsOffLayer.visible = false;
					dialog.show('powering-on-generators-001');
				}
			},
		]
	},
	"generator-console-001": {
		"text": "Generator control console",
		"speaker": "lisa",
		"buttons": [
			{
				"text": "Circuit setup",
				"action": () => dialog.show('generator-console-circuit-menu')
			},
		]
	},
	"powering-on-generators-001": {
		"speaker": "lisa",
		"text": "Powering on generators, please stand by...",
		"action": () => dialog.show('powering-on-generators-002')
	},
	"powering-on-generators-002": {
		"speaker": "lisa",
		"text": "Running stress tests...",
		"action": () => {
			stateMachine.player.scene.generatorBrokenLayer.visible = true;
			dialog.show('powering-on-generators-003');
		}
	},
	"powering-on-generators-003": {
		"speaker": "lisa",
		"text": "Critical error, shutting down generators.",
		"action": () => {
			stateMachine.player.scene.generatorsOffLayer.visible = true;
			stateMachine.generatorsOn = false;
			dialog.show('speech-fix-generators-1')
		}
	},
	"generator-console-circuit-menu": {
		"text": "Choose the circuit to use",
		"speaker": "lisa",
		"buttons": [
			{
				"text": "O-O-O O-O&nbsp&nbsp&nbsp<br>&nbsp| | | |&nbsp&nbsp<br>&nbsp&nbspO O-O O-OO",
				"action": () => dialog.show('generator-console-circuit-wrong-001')
			},
			{
				"text": "O-O O&nbspO-O&nbsp&nbsp&nbsp<br>&nbsp| &nbsp | |&nbsp&nbsp<br>&nbsp&nbspO-O-O O-OO",
				"action": () => dialog.show('generator-console-circuit-correct-001')
			},
			{
				"text": "O-O-O-O-O&nbsp&nbsp&nbsp<br>&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>&nbsp&nbspO-O-O-O-OO",
				"action": () => dialog.show('generator-console-circuit-wrong-001')
			},
			{
				"text": "Cancel"
			}
		]
	},
	"generator-console-circuit-wrong-001": {
		"text": "System restart imminent.",
		"speaker": "lisa",
		"action": () => {
			stateMachine.generatorsOn = true;
			stateMachine.player.scene.generatorsOffLayer.visible = false;
			dialog.show('generator-console-circuit-wrong-002');
		}
	},
	"generator-console-circuit-wrong-002": {
		"speaker": "lisa",
		"text": "Powering on generators, please stand by...",
		"action": () => dialog.show('generator-console-circuit-wrong-003')
	},
	"generator-console-circuit-wrong-003": {
		"speaker": "lisa",
		"text": "Running stress tests...",
		"action": () => {
			stateMachine.player.scene.generatorBrokenLayer.visible = true;
			dialog.show('generator-console-circuit-wrong-004');
		}
	},
	"generator-console-circuit-wrong-004": {
		"speaker": "lisa",
		"text": "Critical error, shutting down generators.",
		"action": () => {
			stateMachine.player.scene.generatorsOffLayer.visible = true;
			stateMachine.generatorsOn = false;
			dialog.show('generator-console-circuit-wrong-005')
		}
	},
	"generator-console-circuit-wrong-005": {
		"speaker": "lisa",
		"text": "Please make sure to use the correct configuration, Dave.<br>We don't want this room to explode."
	},
	"generator-console-circuit-correct-001": {
		"text": "System restart imminent.",
		"speaker": "lisa",
		"action": () => {
			stateMachine.generatorsOn = true;
			stateMachine.player.scene.generatorsOffLayer.visible = false;
			dialog.show('generator-console-circuit-correct-002');
		}
	},
	"generator-console-circuit-correct-002": {
		"speaker": "lisa",
		"text": "Powering on generators, please stand by...",
		"action": () => dialog.show('generator-console-circuit-correct-003')
	},
	"generator-console-circuit-correct-003": {
		"speaker": "lisa",
		"text": "Running stress tests...",
		"action": () => {
			stateMachine.player.scene.generatorBrokenLayer.visible = true;
			dialog.show('generator-console-circuit-correct-004');
		}
	},
	"generator-console-circuit-correct-004": { 
		"speaker": "lisa",
		"text": "The generators appear to be working in an orderly fashion",
		"action": () => {
			stateMachine.player.scene.music.setTrack3();
			stateMachine.player.scene.emergencyLightsBedroomLayer.visible = false;
			stateMachine.player.scene.emergencyLightsGeneratorLayer.visible = false;
			stateMachine.player.scene.setLightmask('full-lights-pipe-broken');
			stateMachine.player.scene.brokenPipesLayer.visible = true;
			stateMachine.player.scene.critter.sprite.visible = true;
		}
	},
	"speech-photograph-1": {
		"text": "I wonder who they are… They look so happy. Did they used to work here?",
		"speaker": "dave"
	},
	"speech-photograph-2": {
		"text": "That is not important to your current task. The generators should now power on.",
		"speaker": "lisa"
		},
	"speech-oxygen-level-low-again-1": {
		"text": "Dave, the oxygen levels have fallen again. Didn’t you fix the leak before?",
		"speaker": "lisa"
		},
	"speech-oxygen-level-low-again-2": {	
		"text": "Yes, I did! I’ll check what’s going on…What could be causing the leak?",
		"speaker": "dave"
		},
	"speech-oxygen-level-low-again-3": {	
		"text": "Oxygen is vital to our survival. Check the oxygen supply room to find out what’s happening.",
		"speaker": "lisa"
		},
	"speech-oxygen-level-low-again-4": {	
		"text": "Yes, you’ve said that before. Vital to our survival. Who even are you? And why can you hear me think?",
		"speaker": "dave"
		},
	"speech-oxygen-level-low-again-5": {	
		"text": "That is not important. I can hear you because I created you. You’re working for me.",
		"speaker": "lisa"
		},
	"speech-oxygen-level-low-again-6": {	
		"text": "I do want to survive. And who knows maybe I’m not alone here…",
		"speaker": "dave"
		},
	"speech-oxygen-level-low-again-7": {	
		"text": "That’s the spirit! I think a power surge in the oxygen control room could chase away the creatures. The power surge can be triggered in the zero oxygen room.",
		"speaker": "lisa"
		},
	"speech-zero-oxygen-room-1": {	
		"text": "There’s a door that I haven’t entered. I’d like to see what I can find there.",
		"speaker": "dave"
		},
	"speech-zero-oxygen-room-2": {	
		"text": "Dave, you weren’t supposed to go in there. Your job here is done, you may go back to sleep.",
		"speaker": "lisa"
		},
	"speech-zero-oxygen-room-3": {	
		"text": "What’s going on here? That’s not me, but he looks so similar…",
		"speaker": "dave"
		},
	"speech-zero-oxygen-room-4": {	
		"text": "That’s enough! It’s time for you to go back to sleep. Please return to the regenerative area.",
		"speaker": "lisa"
		},
	"speech-zero-oxygen-room-5": {	
		"text": "Something strange is going on. Written on the VHS tape is Gate Keepers: Dave05061991.<br> Gate Keepers was the user name written down on the sticky note.",
		"speaker": "dave"
		},
	"speech-door-001-locked": {
		"text": "TODO: This door seems to be locked because on the other side is no oxigen.",
		"speaker": "dave"
	},
	"space-suit-drawer": {
		"text": "TODO: Oh a space suit",
		"speaker": "dave",
		"buttons": [
            {
                "text": "Put it on",
                "action": () => {
					stateMachine.state = STATES.cutScene;
					
					stateMachine.player.sprite.anims.play('putOnSpaceSuit', true);
					stateMachine.player.scene.sounds.putOnSpaceSuitNoise.play();
					stateMachine.player.sprite.on('animationcomplete', function (animation) {
						if (animation.key === 'putOnSpaceSuit') {
							stateMachine.state = STATES.normal;
						}
					});

					stateMachine.player.wearsSpaceSuit = true;
					content["space-suit-drawer"].proxyFor = "space-suit-drawer-empty";
					lockDoor("door-bridge", false);
					stateMachine.player.scene.music.setToSpaceSuitMode();
				}
			},
			{
				"text": "Better leave it there"
			}
        ]
	},
	"space-suit-drawer-empty": {
		"text": "TODO: the drawer i got the spacesuit from",
		"speaker": "dave",
		"buttons": [
			{
                "text": "Put it out",
                "action": () => {
					stateMachine.state = STATES.cutScene;
					
					stateMachine.player.sprite.anims.playReverse('putOnSpaceSuit', true);
					stateMachine.player.scene.sounds.putOnSpaceSuitNoise.play();
					stateMachine.player.sprite.on('animationcomplete', function (animation) {
						if (animation.key === 'putOnSpaceSuit') {
							stateMachine.state = STATES.normal;
						}
					});

					stateMachine.player.wearsSpaceSuit = false;
					content["space-suit-drawer"].proxyFor = null;
					lockDoor("door-bridge", true);
					stateMachine.player.scene.music.setToNormalMode();
				}
			},
			{
				"text": "I'll better leave"
			}
        ]
	},
	"storage-drawer-001": {
		"text": "There is nothing useful in there.",
		"speaker": "dave"
	},
	"storage-drawer-002": {
		"text": "Typical things you see in a storage room. Nothing interesting!",
		"speaker": "dave"
	},
	"storage-drawer-003": {
		"text": "Oh there is a note!<br>…<br>'Kitchen supplies'<br>How disappointing…",
		"speaker": "dave"
	}
}

export default content;
