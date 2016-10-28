'use strict';
class PobsCardFooter extends PobsCardBlock {
    static get is() {
        return 'pobs-card-footer';
    }
    static get config() {
        let config = super.config;
        config.properties.baseStyle.value = 'card-footer';
        return config;
    }
}

customElements.define(PobsCardFooter.is, PobsCardFooter);