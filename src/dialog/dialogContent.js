import dialog from './dialog.js';
import stateMachine from '../stateMachine';

export default {
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
        "speaker": "dave"
    },
	"speech-oxygen-level-low-1": {
		"text": "Shit. What’s happening here?",
		"speaker": "dave"
		},
	"speech-oxygen-level-low-2": {
		"text": "Hello Dave. Welcome to Lisa’s Landing. You’ve been chosen to help us survive. As you can see, the oxygen levels are getting too low. Please go to the oxygen control room and fix the problem.",
		"speaker": "lisa"
		},
	"speech-oxygen-level-low-3": {
		"text": "How does the voice know who I am? I guess I should keep following the emergency lights to the oxygen control room.",
		"speaker": "dave"
	},
	"speech-fix-leak-1": {
		"text": "One of the pipes seems to have a leak. I need to find something to cover the hole.",
		"speaker": "dave"
		},
	"speech-fix-leak-2": {
		"text": "Why don’t you look in the cabinet next to the computer for something useful?",
		"speaker": "lisa"
	},
	"speech-fixed-leak": {
		"text": "Thanks Dave. Now we need to get the generators up and running.",
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
}