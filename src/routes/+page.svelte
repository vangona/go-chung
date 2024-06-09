<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { deepArrStringify } from '$lib/utils';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let prompt: string = '';
	let isLoading: boolean = false;

	let languageIndex = 0;
	const welcomeStr = ['안녕하세요', 'Hello', '你好', 'こんにちは', 'Xin chào', 'สวัสดี'];
	const askGuideStr = [
		'한국 살이에 궁금한 것들을 물어보세요.',
		"Ask about things you're curious about living in Korea.",
		'请问关于在韩国生活的疑问。',
		'韓国での生活について気になることを質問してください。',
		'Hãy hỏi những điều bạn tò mò về cuộc sống ở Hàn Quốc.',
		'ถามสิ่งที่คุณสงสัยเกี่ยวกับการใช้ชีวิตในเกาหลี'
	];
	const askMeAnythingStr = [
		'무엇이든 물어보세요.',
		'Ask me anything.',
		'任何事情都可以问我',
		'何でも聞いてください。',
		'Hãy hỏi tôi bất cứ điều gì.',
		'ถามอะไรก็ได้'
	];
	const askStr = ['물어보기', 'Asking', '询问', '質問する', 'Hỏi', 'ถาม'];

	let roller: number;

	onMount(() => {
		roller = setInterval(() => {
			if (languageIndex < welcomeStr.length - 1) {
				languageIndex++;
				return;
			}

			if (languageIndex === welcomeStr.length - 1) languageIndex = 0;
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(roller);
	});

	const handleAskClick = async () => {
		if (!prompt) return;

		const chatId = uuidv4();
		isLoading = true;
		const res = await fetch('http://127.0.0.1:8008/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				question: prompt
			})
		});

		const result = await res.json();

		localStorage.setItem(
			LOCALSTORAGE_PREFIX + chatId,
			deepArrStringify([
				{ role: ChatRole.USER, content: prompt, dttm: new Date().toString(), chatId },
				{ role: ChatRole.ASSISTANT, content: result.answer, dttm: new Date().toString(), chatId }
			] satisfies Array<ChatData>)
		);

		isLoading = false;

		goto('/chat/' + chatId);
	};
</script>

{#if isLoading}
	<div
		class="absolute z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-black opacity-30"
	>
		<span class="loading loading-ring w-20 text-primary"></span>
		<div class="text-h4 text-white">Loading...</div>
	</div>
{/if}
<div class="flex w-full flex-col items-center justify-center gap-20">
	<div class="flex flex-col gap-20">
		<div class="flex flex-col justify-center gap-2">
			<div class="chat chat-start flex translate-x-[120px] justify-center">
				<div class="chat-bubble chat-bubble-primary">
					{#key languageIndex}
						<div transition:slide class="min-w-[80px] text-center">{welcomeStr[languageIndex]}</div>
					{/key}
				</div>
			</div>
			<div class="text-center text-h1">GoChung</div>
		</div>
		<div>
			{#key languageIndex}
				<div transition:slide class="text-center">
					{askGuideStr[languageIndex]}
				</div>
			{/key}
		</div>
	</div>
	<div class="flex w-full max-w-[800px] flex-col justify-center gap-2">
		<Textarea bind:value={prompt} placeholder={askMeAnythingStr[languageIndex]} />
		<Button on:click={handleAskClick} class="active:scale-[0.99]">
			{#key languageIndex}
				<div transition:slide={{ axis: 'x' }}>{askStr[languageIndex]}</div>
			{/key}
		</Button>
	</div>
</div>
