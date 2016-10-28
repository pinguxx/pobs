'use strict';
class PobsAlertLink extends mix(Polymer.Element).with(Pobs.ParentStyleBehavior) {
    static get is() {
        return 'pobs-alert-link';
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

customElements.define(PobsAlertLink.is, PobsAlertLink);