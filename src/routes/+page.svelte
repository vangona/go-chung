<script lang="ts">
	import { t, isLoading } from 'svelte-i18n';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

{#if $isLoading}
	<h1>Wait...</h1>
{:else}
	<h1>{$t('page.home.welcome')}</h1>
{/if}
<div></div>
<div></div>
<Textarea />
