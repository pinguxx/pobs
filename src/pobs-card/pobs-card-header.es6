'use strict';
class PobsCardHeader extends PobsCardBlock {
    static get is() {
        return 'pobs-card-header';
    }
    static get config() {
        let config = super.config;
        config.properties.baseStyle.value = 'card-header';
        return config;
    }
}

customElements.define(PobsCardHeader.is, PobsCardHeader);