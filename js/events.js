var Events = (() => {
    let events = {};

    let on = (eventName, funct) => {
        events[eventName] = events[eventName] || [];
        events[eventName].push(funct);
    };

    let off = (eventName, funct) => {
        if (events[eventName]) {
            let index = events[eventName].findIndex(element => element === funct);
            if (index > -1){
                events[eventName].splice(index, 1);
            }
        }
    };

    let emit = (eventName, data) => {
        if (events[eventName]) {
            events[eventName].forEach(funct => funct(data));
        }
    };

    return {
        events, 
        on,
        off,
        emit
    }
})();

export default Events;