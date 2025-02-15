define('link-button:views/admin/field-manager/fields/popup', ['views/fields/int'], (Dep) => {
    return class extends Dep {

        setup() {
            super.setup();
            this.listenTo(this.model, 'change:mode', this.togglePopupSize);
        }

        afterRender() {
            super.afterRender();
            this.togglePopupSize();
        }
        
        togglePopupSize() {
            if (this.model.get('mode') === 'openPopup') {
                this.getParentView().showField('popupHeight');
                this.getParentView().showField('popupWidth');
            } else {
                this.getParentView().hideField('popupHeight');
                this.getParentView().hideField('popupWidth');
            }
        }
    };
});