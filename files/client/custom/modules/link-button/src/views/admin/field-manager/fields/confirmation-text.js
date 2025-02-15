define('link-button:views/admin/field-manager/fields/confirmation-text', ['views/fields/text'], (Dep) => {
    return class extends Dep {

        setup() {
            super.setup();
            this.listenTo(this.model, 'change:confirmationDialog change:mode', this.toggleConfirmationText);
        }

        afterRender() {
            super.afterRender();
            this.toggleConfirmationText();
        }

        toggleConfirmationText() {
            if (this.model.get('confirmationDialog') === true && this.model.get('mode') === 'runEspoWorkflow') {
                this.getParentView().showField('confirmationText');
            } else {
                this.getParentView().hideField('confirmationText');
            }
        }
    };
});