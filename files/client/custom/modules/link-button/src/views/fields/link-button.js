define('link-button:views/fields/link-button', 'views/fields/url', function (Dep) {

    return Dep.extend({

        type: 'link-button',

        listTemplate: 'link-button:fields/list',

        detailTemplate: 'link-button:fields/detail',

        events: {
            'click button[data-action="open-modal"]': function() {
                this.actionOpenModal();
            },
            'click button[data-action="espo-modal"]': function() {
                this.actionEspoModal();
            },
            'click button[data-action="open-popup"]': function() {
                this.actionOpenPopup();
            },
            'click button[data-action="run-workflow"]': function() {
                this.actionEspoWorkFlow();
            },
        },

        afterRender: function() {
            Dep.prototype.afterRender.call(this);
            if (this.model.getFieldParam(this.name, 'hideLabel') === true) {
                this.getLabelElement().hide();
            }
        },

        data: function() {
            return _.extend({
                iconLeft: this.model.getFieldParam(this.name, 'iconLeft'),
                iconRight: this.model.getFieldParam(this.name, 'iconRight'),
                mode: this.model.getFieldParam(this.name, 'mode'),
                buttonLabel: this.model.getFieldParam(this.name, 'buttonLabel') || null,
                title: this.model.getFieldParam(this.name, 'title') || null,
                buttonSize: this.model.getFieldParam(this.name, 'buttonSize'),
                style: this.model.getFieldParam(this.name, 'style'),
            }, Dep.prototype.data.call(this));
        },

        actionOpenModal: function() {
            this.notify('Loading...');
            this.createView('dialog', 'link-button:views/modals/button-url', {
                buttonLabel: this.model.getFieldParam(this.name, 'buttonLabel') || null,
                url: this.model.get(this.name),
                closeButton: true,
                backdrop: true,
            }, function (view) {
                view.render();
                this.notify(false);
                this.listenToOnce(view, 'close', () => {
                    this.clearView('dialog');
                });
            }, this);
        },

        actionEspoModal: function() {
            let model = this.model;
            let url = this.model.get(this.name);
            let hashPart = url.split('#')[1];
            if (!hashPart) {
                return Espo.Ui.error('Error: this is not a valid CRM URL');
            }
        
            let parts = hashPart.split('/');
            let entityType = parts[0];
            if (!entityType) {
                return Espo.Ui.error('Error: no entity type found');
            }
        
            let recordId = parts[parts.length - 1];
            if (!recordId) {
                return Espo.Ui.error('Error: no record ID found');
            }
        
            this.notify('Loading...');
            this.createView('quickView', 'link-button:views/modals/espo-modal', {
                scope: entityType,
                id: recordId,
                removeDisabled: true,
            }, function (view) {
                view.render();
                this.notify(false);
                this.listenTo(view, 'after:save', () => {
                    model.fetch();
                });
                this.listenToOnce(view, 'close', () => {
                    this.clearView('quickView');
                });
            }, this);
        },

        actionEspoWorkFlow: function() {
            let model = this.model;
            let url = model.get(this.name);
            let hashPart = url.split('#')[1];
            if (!hashPart) {
                return Espo.Ui.error('Error: this is not a valid workflow URL');
            }
            let parts = hashPart.split('/');
            let entityType = parts[0];
            if (!entityType) {
                return Espo.Ui.error('Error: no entity type found');
            }
            let workflowId = parts[parts.length - 1];
            if (entityType !== 'Workflow') {
                return Espo.Ui.error(('Error: not a workflow'));
            }
            //TODO Api action to check if the workflow is manual
                Espo.Ajax.postRequest('WorkflowManual/action/run', {
                    targetId: model.id,
                    id: workflowId,
                }).then(() => {
                    model.fetch().then(() => {
                        Espo.Ui.success(('Done'));
                    });
                });
            
        },

        actionOpenPopup: function() {
            window.open(this.model.get(this.name), '_blank', 'scrollbars=yes,height=800,width=600');
        },
    });
});
