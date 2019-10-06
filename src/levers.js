import dialog from './dialog/dialog.js';
// import { toggleDoor } from './doors.js';

const toggleLever = (lever, action) => {
    lever.setFrame((lever.frame.name + 1) % 2);
    action();
}

export default {
    "lever-001": (lever) => toggleLever(lever, () => {
        console.log('lever 001 used');
        // toggleDoor(9, 2);
    }),
    "lever-002": (lever) => toggleLever(lever, () => {
        console.log('lever 002 used');
        // toggleDoor(4, 11);
        // toggleDoor(5, 11);
        dialog.show('speech-004');
    })
}
