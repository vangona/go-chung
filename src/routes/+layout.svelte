<script>
	import '../app.css';
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

<main class="px-10 py-10">
	<slot></slot>
</main>

<style></style>
