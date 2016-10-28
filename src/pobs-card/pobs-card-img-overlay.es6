'use strict';
class PobsCardImgOverlay extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-img-overlay';
    }
}

customElements.define(PobsCardImgOverlay.is, PobsCardImgOverlay);