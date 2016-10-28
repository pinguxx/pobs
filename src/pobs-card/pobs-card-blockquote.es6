'use strict';
class PobsCardBlockQuote extends mix(Polymer.Element).with(Pobs.InverseBehavior) {
    static get is() {
        return 'pobs-card-blockquote';
    }
}

customElements.define(PobsCardBlockQuote.is, PobsCardBlockQuote);