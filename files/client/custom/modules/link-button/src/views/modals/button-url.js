define('link-button:views/modals/button-url', 'views/modal', function (Dep) {

    return Dep.extend({

        template: 'link-button:modals/button-url',
        fitHeight: true,
        isCollapsable: true,
        
        data: function () {
            return {
                url: this.options.url
            };
        },

        setup: function () {
            this.headerText = document.title || this.options.buttonLabel || 'Modal';
        },
        
    });
});