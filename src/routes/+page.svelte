<script lang="ts">
	import { t, isLoading } from 'svelte-i18n';
</script>

{#if $isLoading}
	<h1>Wait...</h1>
{:else}
	<h1>{$t('page.home.welcome')}</h1>
{/if}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button class="btn btn-primary">daisy ui</button>
