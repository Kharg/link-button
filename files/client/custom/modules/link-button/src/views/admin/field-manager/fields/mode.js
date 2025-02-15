define('link-button:views/admin/field-manager/fields/mode', ['views/fields/enum'], (Dep) => {
    return class extends Dep {
        
        setup() {
            super.setup();
            this.updateModeOptions();
        }

        afterRender() {
            super.afterRender();
        }

        updateModeOptions() {
            const isAdvancedPackInstalled = this.getHelper().getAppParam('isAdvancedPackInstalled');
            const modeOptions = this.model.getFieldParam('mode', 'options') || [];

            if (isAdvancedPackInstalled) {
                modeOptions.push('runEspoWorkflow');
            }

        }
    };
});