'use strict';
class PobsCardLink extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-link';
    }
    static get config() {
        return {
            properties: {
                href: {
                    type: String,
                    value: '#'
                }
            }
        }
    }
}

customElements.define(PobsCardLink.is, PobsCardLink);