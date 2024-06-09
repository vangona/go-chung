<script context="module">
	import { getLocaleFromNavigator, init, register, waitLocale } from 'svelte-i18n';

	register('ko', () => import('../locale/ko.json'));
	register('en', () => import('../locale/en.json'));

	init({
		fallbackLocale: 'ko',
		initialLocale: getLocaleFromNavigator()
	});

	export async function preload() {
		return waitLocale();
	}
</script>

<slot />
