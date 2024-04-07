{{#ifEqual mode 'openNewTab'}}
    {{#if value}}
        <a href="{{url}}" class="btn btn-{{style}} {{buttonSize}}" title="{{title}}" target="_blank">
            {{#if iconLeft}}
            <span class="{{iconLeft}}"></span>
			{{/if}}
			{{#if buttonLabel}}
            <span> {{buttonLabel}} </span>
			{{/if}}
            {{#if iconRight}}
            <span class="{{iconRight}}"></span>
			{{/if}}
        </a>
        {{else}}
            {{#if valueIsSet}}
                <span class="none-value">{{translate 'None'}}</span>
            {{else}}
                <span class="loading-value">...</span>
            {{/if}}
        {{/if}}
{{/ifEqual}}

{{#ifEqual mode 'openPopup'}}
    {{#if value}}
        <button class="btn btn-{{style}} {{buttonSize}}" title="{{title}}" data-action="open-popup">
            {{#if iconLeft}}
            <span class="{{iconLeft}}"></span>
			{{/if}}
			{{#if buttonLabel}}
            <span> {{buttonLabel}} </span>
			{{/if}}
            {{#if iconRight}}
            <span class="{{iconRight}}"></span>
			{{/if}}
        </button>
    {{else}}
        {{#if valueIsSet}}
            <span class="none-value">{{translate 'None'}}</span>
        {{else}}
            <span class="loading-value">...</span>
        {{/if}}
    {{/if}}
{{/ifEqual}}

{{#ifEqual mode 'openModal'}}
    {{#if value}}
        <button class="btn btn-{{style}} {{buttonSize}}" title="{{title}}" data-action="open-modal">
            {{#if iconLeft}}
            <span class="{{iconLeft}}"></span>
			{{/if}}
			{{#if buttonLabel}}
            <span> {{buttonLabel}} </span>
			{{/if}}
            {{#if iconRight}}
            <span class="{{iconRight}}"></span>
			{{/if}}
        </button>
    {{else}}
        {{#if valueIsSet}}
            <span class="none-value">{{translate 'None'}}</span>
        {{else}}
            <span class="loading-value">...</span>
        {{/if}}
    {{/if}}
{{/ifEqual}}

{{#ifEqual mode 'openEspoModal'}}
    {{#if value}}
        <button class="btn btn-{{style}} {{buttonSize}}" title="{{title}}" data-action="espo-modal">
            {{#if iconLeft}}
            <span class="{{iconLeft}}"></span>
			{{/if}}
			{{#if buttonLabel}}
            <span> {{buttonLabel}} </span>
			{{/if}}
            {{#if iconRight}}
            <span class="{{iconRight}}"></span>
			{{/if}}
        </button>
    {{else}}
        {{#if valueIsSet}}
            <span class="none-value">{{translate 'None'}}</span>
        {{else}}
            <span class="loading-value">...</span>
        {{/if}}
    {{/if}}
{{/ifEqual}}

{{#ifEqual mode 'runEspoWorkflow'}}
    {{#if value}}
        <button class="btn btn-{{style}} {{buttonSize}}" title="{{title}}" data-action="run-workflow">
            {{#if iconLeft}}
            <span class="{{iconLeft}}"></span>
			{{/if}}
			{{#if buttonLabel}}
            <span> {{buttonLabel}} </span>
			{{/if}}
            {{#if iconRight}}
            <span class="{{iconRight}}"></span>
			{{/if}}
        </button>
    {{else}}
        {{#if valueIsSet}}
            <span class="none-value">{{translate 'None'}}</span>
        {{else}}
            <span class="loading-value">...</span>
        {{/if}}
    {{/if}}
{{/ifEqual}}