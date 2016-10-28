'use strict';
class PobsCardTitle extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-title';
    }
    static get config() {
        return {
            properties: {
                style: {
                    type: String,
                    value: 'h4'
                },
                baseStyle: {
                    type: String,
                    value: 'card-title'
                }
            }
        }
    }
}

customElements.define(PobsCardTitle.is, PobsCardTitle);