'use strict';
class PobsCardBlock extends mix(Polymer.Element).with(Pobs.InverseBehavior, Pobs.ParentStyleBehavior) {
    static get is() {
        return 'pobs-card-block';
    }
    static get config() {
        return {
            properties: {
                style: {
                    type: String,
                    value: ''
                },
                baseStyle: {
                    type: String,
                    value: 'card-block'
                }
            }
        }
    }
}

customElements.define(PobsCardBlock.is, PobsCardBlock);