<script lang="ts">
	import * as Select from '$lib/components/ui/select/index';
	import '../app.css';
	import { getLocaleFromNavigator, init, register, waitLocale } from 'svelte-i18n';
	import { slide } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import Snb from './Snb.svelte';

	register('ko', () => import('../locale/ko.json'));
	register('en', () => import('../locale/en.json'));

	init({
		fallbackLocale: 'ko',
		initialLocale: getLocaleFromNavigator()
	});

	const languages = [
		{ value: 'ko', label: '한국어' },
		{ value: 'en', label: 'English' },
		{ value: 'zh-Hans', label: '简体中文' },
		{ value: 'ja', label: '日本語' },
		{ value: 'vi', label: 'Tiếng Việt' },
		{ value: 'th', label: 'แบบไทย' }
	];

	let selectedOption: { label?: string; value: string } | undefined;
	let languageIndex = 0;
	let languageStr = ['언어', 'Language', '语言', '言語', 'ngôn ngữ', 'ภาษา'];
	let roller: number | NodeJS.Timeout;

	onMount(() => {
		roller = setInterval(() => {
			if (languageIndex < languageStr.length - 1) {
				languageIndex++;
				return;
			}

			if (languageIndex === languageStr.length - 1) languageIndex = 0;
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(roller);
	});

	export async function preload() {
		return waitLocale();
	}
</script>

<main class="flex h-full">
	<nav class="fixed right-5 top-5">
		<Select.Root
			selected={selectedOption}
			onSelectedChange={(value) => {
				value && (selectedOption = value);
			}}
		>
			<Select.Trigger class="w-[140px]">
				<Select.Value asChild>
					<div class="min-w-[80px] text-body4">
						{#if selectedOption}
							<div>
								{selectedOption.label}
							</div>
						{:else}
							{#key languageIndex}
								<div transition:slide>
									{languageStr[languageIndex]}
								</div>
							{/key}
						{/if}
					</div>
				</Select.Value>
			</Select.Trigger>
			<Select.Content class="z-50">
				<Select.Group>
					{#each languages as language}
						<Select.Item value={language.value} label={language.label}>{language.label}</Select.Item
						>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="language" />
		</Select.Root>
	</nav>
	{#if $page.url.pathname !== '/'}
		<Snb />
	{/if}
	<div class="flex h-full w-full items-center justify-center px-10 py-10">
		<slot></slot>
	</div>
</main>
