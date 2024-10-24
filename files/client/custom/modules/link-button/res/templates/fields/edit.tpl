<input
	type="text"
	class="main-element form-control"
    placeholder="{{placeholder}}"
	data-name="{{name}}"
	value="{{value}}"
	{{#if params.maxLength}} maxlength="{{params.maxLength}}"{{/if}}
	autocomplete="espo-{{name}}"
    {{#if noSpellCheck}}
    spellcheck="false"
    {{/if}}
>