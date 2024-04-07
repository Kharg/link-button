{{#ifEqual mode 'openNewTab'}}
    {{#if value}}
        <a href="{{url}}" class="btn btn-{{style}} label-md" style="height:24px" title="{{title}}" target="_blank">
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
        {{/if}}
        {{/ifEqual}}
{{#ifEqual mode 'openPopup'}}
    {{#if value}}
        <button class="btn btn-{{style}} label-md" style="height:24px" title="{{title}}" data-action="open-popup">
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
    {{/if}}
    {{/ifEqual}}
    {{#ifEqual mode 'openModal'}}
    {{#if value}}
        <button class="btn btn-{{style}} label-md" style="height:24px" title="{{title}}" data-action="open-modal">
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
    {{/if}}
    {{/ifEqual}}
    {{#ifEqual mode 'openEspoModal'}}
    {{#if value}}
        <button class="btn btn-{{style}} label-md" style="height:24px" title="{{title}}" data-action="espo-modal">
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
    {{/if}}
    {{/ifEqual}}

	{{#ifEqual mode 'runEspoWorkflow'}}
    {{#if value}}
        <button class="btn btn-{{style}} label-md" style="height:24px" title="{{title}}" data-action="run-workflow">
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
    {{/if}}
    {{/ifEqual}}