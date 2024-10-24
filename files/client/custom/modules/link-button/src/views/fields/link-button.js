define('link-button:views/fields/link-button', 'views/fields/url', function (Dep) {

    return Dep.extend({

        type: 'link-button',

        editTemplate: 'link-button:fields/edit',

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
            'click button[data-action="quick-create"]': function() {
                this.actionQuickCreate();
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
                placeholder: this.model.getFieldParam(this.name, 'placeholder') || null,
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

        actionQuickCreate: function() {
            let model = this.model;
            let url = this.model.get(this.name);
            let hashPart = url.split('#')[1];
            if (!hashPart) {
                return Espo.Ui.error('Error: this is not a valid CRM URL');
            }
        
            let parts = hashPart.split('/');
            let entityTypeModal = parts[0];
            if (!entityTypeModal) {
                return Espo.Ui.error('Error: no entity type found');
            }

            let viewName;
            if (entityTypeModal === 'Email') {
                viewName = 'views/modals/compose-email';
            } else {
                viewName = this.getMetadata().get('clientDefs.' + entityTypeModal + '.modalViews.edit') || 'views/modals/edit';
            }
            
            let attributes = {
                parentId: model.id,
                parentType: model.entityType,
                parentName: model.get('name'),
            };

            if (
                entityTypeModal === 'Email' &&
                ['Contact', 'Lead', 'Account'].includes(model.entityType) &&
                model.get('emailAddress')
            ) {
                attributes.to = model.get('emailAddress');
                attributes.nameHash = {};
                attributes.nameHash[model.get('emailAddress')] = model.get('name');
            }

            this.notify('Loading...');
            this.createView('quickCreate', viewName, {
                scope: entityTypeModal,
                attributes: attributes,
            }, function (view) {
                view.render();
                this.notify(false);
                this.listenTo(view, 'after:save', () => {
                    model.fetch();
                });
                this.listenToOnce(view, 'close', () => {
                    this.clearView('quickCreate');
                    //model.collection.fetch();
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
