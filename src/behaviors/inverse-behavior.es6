'use strict';
var Pobs = Pobs || {};
Pobs.InverseBehavior = (Object) => class extends Object {
    static get config() {
        return {
            properties: {
                inverse: {
                    type: Boolean,
                    value: false,
                    observer: '_inverseHandler'
                }
            }
        }
    }
    _inverseHandler(inverse) {
        this.inverse = inverse;
        Array.prototype.forEach.call(this.children, tag => {
            tag.inverse = inverse;
        });
        if (this.$.container) {
            if (inverse) {
                this.$.container.classList.add('card-inverse');
            } else {
                this.$.container.classList.remove('card-inverse');
            }
        }
    }
};