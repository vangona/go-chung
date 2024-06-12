<script lang="ts">
	import * as Select from '$lib/components/ui/select/index';
	import '../app.css';
	import {
		getLocaleFromNavigator,
		init,
		register,
		waitLocale,
		isLoading,
		locale
	} from 'svelte-i18n';
	import { slide } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import Snb from './Snb.svelte';

	register('ko', () => import('../locale/ko.json'));
	register('en', () => import('../locale/en.json'));
	register('ja', () => import('../locale/ja.json'));
	register('zh-Hans', () => import('../locale/zh-Hans.json'));
	register('vi', () => import('../locale/vi.json'));
	register('th', () => import('../locale/th.json'));

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

{#if $isLoading}
	<div>wait...</div>
{:else}
	<main class="flex h-full">
		<nav class="fixed right-5 top-5">
			<Select.Root
				selected={selectedOption}
				onSelectedChange={(value) => {
					value && locale.set(value.value);
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
							<Select.Item value={language.value} label={language.label}
								>{language.label}</Select.Item
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
		<div class="flex h-full w-full items-start justify-center px-10">
			<slot></slot>
		</div>
	</main>
{/if}
