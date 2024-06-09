<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { deepArrStringify } from '$lib/utils';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';

	let prompt: string = '';
	let isLoading: boolean = false;

	const handleAskClick = async () => {
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
			<div class="chat chat-start flex translate-x-20 justify-center">
				<div class="chat-bubble chat-bubble-primary">
					<!-- {$t('page.home.welcome')} -->
					안녕하세요
				</div>
			</div>
			<div class="text-center text-h1">GoChung</div>
		</div>
		<div class="flex justify-center">한국 살이에 궁금한 것들을 물어보세요.</div>
	</div>
	<div class="flex w-full max-w-[800px] flex-col justify-center gap-2">
		<Textarea bind:value={prompt} placeholder="궁금한거 물어보세요" />
		<Button on:click={handleAskClick} class="active:scale-[0.99]">물어보기</Button>
	</div>
</div>
