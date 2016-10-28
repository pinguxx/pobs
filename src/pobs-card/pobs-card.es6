'use strict';
class PobsCard extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card';
    }
    static get config() {
        return {
            properties: {
                style: {
                    type: String,
                    value: 'default',
                    observer: '_styleHandler'
                },
                block: {
                    type: Boolean,
                    value: false,
                    observer: '_blockHandler'
                },
                outline: {
                    type: Boolean,
                    value: false,
                    observer: '_outlineHandler'
                }
            }
        }
    }
    _styleHandler(style) {
        this.style = style;
        if (!this.outline) {
            Array.prototype.forEach.call(this.children, tag => {
                tag.parentStyle = style;
            });
        }
    }
    _blockHandler(block) {
        if (block) {
            this.$.container.classList.add('card-block');
        } else {
            this.$.container.classList.remove('card-block');
        }
    }
    _outlineHandler(outline) {
        if (outline) {
            this.$.container.classList.remove('card-' + this.style);
            this.$.container.classList.add('card-outline-' + this.style);
        } else {
            this.$.container.classList.add('card-' + this.style);
            this.$.container.classList.remove('card-outline-' + this.style);
        }
    }
}

customElements.define(PobsCard.is, PobsCard);