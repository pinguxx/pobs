'use strict';
var Pobs = Pobs || {};
Pobs.ParentStyleBehavior = (Object) => class extends Object {
    static get config() {
        return {
            properties: {
                parentStyle: {
                    type: Boolean,
                    value: false,
                    observer: '_parentStyleHandler'
                }
            }
        }
    }
    _parentStyleHandler(style) {
        this.parentStyle = style;
        Array.prototype.forEach.call(this.children, tag => {
            tag.parentStyle = style;
        });
    }
};