'use strict';
class PobsCardImg extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-img';
    }
    static get config() {
        return {
            properties: {
                position: {
                    type: String,
                    value: 'default'
                },
                src: {
                    type: String,
                    value: ''
                },
                overlay: {
                    type: Boolean,
                    value: false,
                    observer: '_overlayHandler'
                }
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
    }
    _overlayHandler(overlay) {
        this.overlay = overlay;
        if (overlay) {
            this.$.img.classList.add('card-img');
            this.$.img.classList.remove('card-img-' + this.position);
        } else {
            this.$.img.classList.remove('card-img');
            this.$.img.classList.add('card-img-' + this.position);
        }
    }
}

customElements.define(PobsCardImg.is, PobsCardImg);