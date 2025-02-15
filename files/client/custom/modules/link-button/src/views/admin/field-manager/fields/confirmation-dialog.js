define('link-button:views/admin/field-manager/fields/confirmation-dialog', ['views/fields/bool'], (Dep) => {
    return class extends Dep {

        setup() {
            super.setup();
            this.listenTo(this.model, 'change:mode', this.toggleConfirmationDialog);
        }

        afterRender() {
            super.afterRender();
            this.toggleConfirmationDialog();
        }
        
        toggleConfirmationDialog() {
            if (this.model.get('mode') === 'runEspoWorkflow') {
                this.getParentView().showField('confirmationDialog');
                this.getParentView().showField('hideOriginalWorkflowAction');
            } else {
                this.getParentView().hideField('confirmationDialog');
                this.getParentView().hideField('hideOriginalWorkflowAction');
            }
        }
    };
});