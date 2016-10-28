class PobsTag extends Polymer.Element {
    updateA() {
        if (this.hasHref) {
            this.$.aContainer.innerHTML = this.innerHTML;
        }
    }
    static get is() {
        return 'pobs-tag';
    }
    static get config() {
        return {
            properties: {
                style: {
                    type: String,
                    value: 'default'
                },
                href: {
                    type: String,
                    value: ''
                },
                hasHref: {
                    type: Boolean,
                    value: false,
                    observer: '_linkHandler'
                },
                pill: {
                    type: Boolean,
                    value: false,
                    observer: '_pillHandler'
                }
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
        let element = this;
        if (this.href) {
            this.hasHref = true;
        }
        this.$.tagText.addEventListener('slotchange', function () {
            element.updateA();
        });
    }
    _linkHandler(hasHref) {
        this.updateA();
    }
    _pillHandler(pill) {
        if (pill) {
            this.$.spanContainer.classList.add('tag-pill');
            this.$.aContainer.classList.add('tag-pill');
        } else {
            this.$.spanContainer.classList.remove('tag-pill');
            this.$.aContainer.classList.remove('tag-pill');
        }
    }
}

customElements.define(PobsTag.is, PobsTag);