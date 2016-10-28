'use strict';
/*make this a behavior??*/
function whichTransitionEvent(){
    let el = document.createElement('fakeelement'),
        transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        };

    for(let t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

class PobsAlert extends Polymer.Element {
    checkHeader () {
        if (!this.querySelector('[slot=heading]')) {
            this.hasHeader = false;
        } else {
            this.hasHeader = true;
        }
    }
    static get is() {
        return 'pobs-alert';
    }
    static get config() {
        return {
            properties: {
                style: {
                    type: String,
                    value: 'success',
                    observer: '_styleHandler'
                },
                dismissible: {
                    type: Boolean,
                    value: false,
                    observer: '_dismissibleHandler'
                },
                destroyable: {
                    type: Boolean,
                    value: false
                },
                hasHeader: {
                    type: Boolean,
                    value: true
                }
            }
        }
    }
    constructor() {
        super();
        this.transitionEvent = whichTransitionEvent();
    }
    connectedCallback() {
        super.connectedCallback();
        let element = this;
        this.$.heading.addEventListener('slotchange', function () {
            element.checkHeader();
        });
        this.checkHeader();
    }
    _styleHandler(style) {
        this.style = style;
        Array.prototype.forEach.call(this.children, tag => {
            tag.parentStyle = style;
        });
    }
    _dismissibleHandler(dismissible) {
        if (dismissible) {
            this.$.alertw.classList.add('alert-dismissible', 'fade', 'in');
        } else {
            this.$.alertw.classList.remove('alert-dismissible', 'fade', 'in');
        }
    }
    close() {
        if (!this.destroyable) {
            return this.hide();
        }

        let element = this;

        let complete = () => {
            element.remove();
        }

        if (this.transitionEvent) {
            this.$.alertw.addEventListener(this.transitionEvent, complete);
            this.$.alertw.classList.remove('in');
        } else {
            complete();
        }
    }
    hide() {
        let complete = () => {
            this.$.alertw.classList.add('hidden');
            this.$.alertw.removeEventListener(this.transitionEvent, complete);
        }
        this.$.alertw.addEventListener(this.transitionEvent, complete);
        this.$.alertw.classList.remove('in');
    }
    show() {
        this.$.alertw.classList.remove('hidden');
        this.$.alertw.classList.add('in');
    }
    /*attributeChangedCallback(name, type) {
        let value = this.getAttribute(name);
        this[name] = ''+value.trim() === '' ? true : value;
    }*/
}

customElements.define(PobsAlert.is, PobsAlert);