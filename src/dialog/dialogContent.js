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
			stateMachine.player.scene.emergencyLightsGeneratorLayer.visible = true;
			lockDoor('door-bedroom', false);
			lockDoor('door-004', false);
			lockDoor('door-generatorroom', false);
		},
		"speaker": "lisa"
	},
	"speech-fix-generators-1": {
		"text": "The generator is losing coolant fluid. The coolant temperature cannot reach maximum level.",
		"speaker": "lisa"
		},
	"speech-fix-generators-2": {
		"text": "If it’s losing coolant fluid, then there must be a leak somewhere.",
		"speaker": "dave"
		},
	"speech-fix-generators-3": {
		"text": "The generators are the source of power for the entire control system. We should prevent a generator outage from happening again. <br> The circuit breakers should be checked.",
		"speaker": "lisa"
		},
	"speech-fix-generators-4": {
		"text": "Looks like the circuit was overloaded and shut down. I wonder what caused this much damage…<br> I’ll redistribute the generators to avoid power surges in the future.",
		"speaker": "dave"
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
					lockDoor("door-generatorroom", false);
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
					lockDoor("door-generatorroom", true);
				}
			},
			{
				"text": "I'll better leave"
			}
        ]
	}
}

export default content;