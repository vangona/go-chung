<script lang="ts">
	import { t } from 'svelte-i18n';
	import { afterNavigate, goto } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { checkIsValidPrompt, cn, deepArrParse, deepArrStringify } from '$lib/utils';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';

	/** @type {import('./$types').PageData} */
	export let data;

	let chatData: Array<ChatData> | undefined;
	let prompt: string;
	let hasNewAnswer: boolean = false;
	let isLoading: boolean = false;

	onMount(() => {
		const localData = localStorage.getItem(LOCALSTORAGE_PREFIX + data.id);
		chatData = deepArrParse<ChatData>(localData ?? '');
	});

	afterNavigate(() => {
		const localData = localStorage.getItem(LOCALSTORAGE_PREFIX + data.id);
		chatData = deepArrParse<ChatData>(localData ?? '');
	});

	const saveToLocalStorage = () => {
		if (!chatData) return;
		const stringifiedChatData = deepArrStringify(chatData);
		localStorage.setItem(LOCALSTORAGE_PREFIX + data.id, stringifiedChatData);
	};

	const getAnswer = async () => {
		isLoading = true;
		hasNewAnswer = true;

		try {
			const res = await fetch('http://127.0.0.1:8008/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					question: prompt
				})
			});

			if (res.status !== 200) {
				toast.error($t('common.info.error') + ', ' + res.status);
				return;
			}

			const result = await res.json();
			chatData = chatData?.concat({
				role: ChatRole.ASSISTANT,
				content: result.answer,
				dttm: new Date().toString(),
				chatId: data.id
			});
			prompt = '';

			toast.success($t('common.administrative.help'), {
				action: { label: $t('common.button.continue'), onClick: () => goto('/administrative') }
			});
		} catch (error) {
			toast.error($t('common.info.error'));
		}

		isLoading = false;
		hasNewAnswer = false;
	};

	const handleSumbit = async () => {
		if (isLoading || hasNewAnswer) return;
		if (!checkIsValidPrompt(prompt)) return;

		chatData = chatData?.concat({
			role: ChatRole.USER,
			content: prompt,
			dttm: new Date().toString(),
			chatId: data.id
		});
		await getAnswer();
		saveToLocalStorage();
	};

	// keydown 때 입력된 엔터가 반영되지 않도록 keyup 사용
	const handleTextareaKeyup = (e: KeyboardEvent) => {
		if (e.key === 'Enter') handleSumbit();
	};
</script>

<div class="flex h-full w-full max-w-[1080px] flex-col gap-10">
	<h1 class="mt-20 text-center text-h4">GoChung</h1>
	<ScrollArea class="h-[50vh]">
		<div class="flex flex-col gap-2">
			{#if !chatData}
				<div>데이터가 없습니다.</div>
			{:else}
				{#each chatData as item}
					<div
						class={cn(
							'chat',
							{ 'chat-end': item.role === ChatRole.USER },
							{ 'chat-start': item.role === ChatRole.ASSISTANT }
						)}
					>
						<div
							class={cn(
								'chat-bubble',
								{ 'chat-bubble-secondary': item.role === ChatRole.USER },
								{ 'chat-bubble-accent': item.role === ChatRole.ASSISTANT }
							)}
						>
							<SvelteMarkdown source={item.content} />
						</div>
					</div>
				{/each}
			{/if}
			{#if hasNewAnswer && isLoading}
				<div class="chat chat-start">
					<div class="chat-bubble chat-bubble-accent">
						<span class="loading loading-dots"></span>
					</div>
				</div>
			{/if}
		</div>
	</ScrollArea>
	<div
		class="fixed bottom-[30px] flex w-[calc(100vw_-_80px)] flex-col gap-2 desktop:w-[calc(100vw_-_350px)] desktop:max-w-[1080px]"
	>
		<Textarea
			on:keyup={handleTextareaKeyup}
			bind:value={prompt}
			placeholder={$t('common.textarea.placeholder')}
		/>
		<button on:click={handleSumbit} class="btn btn-primary w-full">
			{$t('common.button.ask')}</button
		>
	</div>
</div>
