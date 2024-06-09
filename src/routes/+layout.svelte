<script>
	import * as Select from '$lib/components/ui/select/index';
	import '../app.css';
	import { getLocaleFromNavigator, init, register, waitLocale } from 'svelte-i18n';

	register('ko', () => import('../locale/ko.json'));
	register('en', () => import('../locale/en.json'));

	init({
		fallbackLocale: 'ko',
		initialLocale: getLocaleFromNavigator()
	});

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'pineapple', label: 'Pineapple' }
	];

	export async function preload() {
		return waitLocale();
	}
</script>

<main class="h-full">
	<nav class="fixed right-5 top-5">
		<Select.Root portal={null}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select a fruit" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Fruits</Select.Label>
					{#each fruits as fruit}
						<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="favoriteFruit" />
		</Select.Root>
	</nav>
	<div class="flex h-full w-full items-center justify-center px-10 py-10">
		<slot></slot>
	</div>
</main>

<style></style>
