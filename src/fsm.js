class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined) {
            throw new TypeError('Error');
        } else {
            this.con = config;
            this.state = config.initial;
            this.steps = [];
            this.next = [];
            this.check = 0;
        }

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let config = this.con;
        let states = Object.keys(config.states);
        if (states.includes(state)) {
            this.steps.push(this.state);
            this.state = state;
            this.check = 0;
        } else {
            throw new TypeError('state does not exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let config = this.con;
        if (config['states'][this.state]['transitions'][event] !== undefined) {
            this.steps.push(this.state);
            this.state = config['states'][this.state]['transitions'][event];
            this.check = 0;
        } else {
            throw new TypeError('event in current state does not exist');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        let config = this.con;
        this.state = config.initial;
        this.steps = [];
        this.next = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let config = this.con;
        if (event == undefined) {
            return Object.getOwnPropertyNames(config.states);
        } else {
            return Object.keys(config.states).filter(key => Object.keys(config['states'][key]['transitions']).includes(event));
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        let steps = this.steps;
        if (steps.length == 0){
            return false;
        } else {
            this.next.push(this.state);
            this.state = this.steps.pop();
            this.check = 1;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ((this.next.length == 0)||(this.check == 0)){
            return false;
        } else {
            this.steps.push(this.state);
            this.state = this.next.pop();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.steps = [];
        this.next = [];
        this.check = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
