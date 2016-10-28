'use strict';
class PobsCardSubitle extends PobsCardTitle {
    static get is() {
        return 'pobs-card-subtitle';
    }
    static get config() {
        let config = super.config;
        config.properties.baseStyle.value = 'card-subtitle';
        return config;
    }
}

customElements.define(PobsCardSubitle.is, PobsCardSubitle);