'use strict';
class PobsCardText extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-text';
    }
}

customElements.define(PobsCardText.is, PobsCardText);