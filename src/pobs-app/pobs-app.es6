class PobsApp extends Polymer.Element {
    static get is() {
        return 'pobs-app';
    }
    static get config() {
        return {
            properties: {
                page: {
                    type: String,
                    reflectToAttribute: true/*,
                    observer: '_pageChanged'*/
                }
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
        let notitle = this.$.notitle,
            show = this.$.show,
            warning = this.$.warning,
            hide = this.$.hide,
            dangerTag = this.$.dangerTag,
            dangerLinkTag = this.$.dangerLinkTag;
        //updating title
        setTimeout(function () {
            notitle.innerHTML = '<span slot="heading">w0_ot</span>Thanks for my title';
        }, 1000);

        show.addEventListener('click', function () {
            warning.show();
        });

        hide.addEventListener('click', function () {
            warning.hide();
        });
        //update tags
        setTimeout(function () {
           dangerTag.innerHTML = '<span>this is a</span> cool test';
        }, 1000);
        setTimeout(function () {
           dangerLinkTag.innerHTML = '<span>this is a link</span> that updates correctly';
        }, 1000);
        setTimeout(function () {
           dangerLinkTag.pill = false;
        }, 2000);
        setTimeout(function () {
           dangerLinkTag.pill = true;
        }, 3000);
    }
}

customElements.define(PobsApp.is, PobsApp);