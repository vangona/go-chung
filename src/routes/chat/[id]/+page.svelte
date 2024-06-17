<script lang="ts">
	import { t } from 'svelte-i18n';
	import { afterNavigate, goto } from '$app/navigation';
	import { Textarea } from '$lib/components/ui/textarea';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { checkIsValidPrompt, cn, deepArrParse, deepArrStringify } from '$lib/utils';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';
	import { QuestionCategory, type AnswerApi } from '../../../constatns/api';

	/** @type {import('./$types').PageData} */
	export let data;

	let chatData: Array<ChatData> | undefined;
	let prompt: string;
	let hasNewAnswer: boolean = false;
	let isLoading: boolean = false;

	onMount(() => {
		const localData = localStorage.getItem(LOCALSTORAGE_PREFIX + data.id);
		chatData = deepArrParse<ChatData>(localData ?? '');

		// setTimeout을 통해서 렌더링 이후에 스크롤이 움직이도록 함. TODO: svelte에서는 dom controll 이슈를 어떻게 해결했을까?
		setTimeout(() => {
			const chatScroll = document.querySelector('#chat-detail-scroll');
			if (chatScroll) {
				chatScroll.scrollTo({
					top: chatScroll.scrollHeight + 100,
					behavior: 'instant'
				});
			}
		});
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

		// setTimeout을 통해서 렌더링 이후에 스크롤이 움직이도록 함.
		setTimeout(() => {
			const chatScroll = document.querySelector('#chat-detail-scroll');
			if (chatScroll) {
				chatScroll.scrollTo({
					top: chatScroll.scrollHeight + 100,
					behavior: 'smooth'
				});
			}
		}, 100);

		try {
			const res = await fetch('/api', {
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

			const result = (await res.json()) as AnswerApi;
			chatData = chatData?.concat({
				role: ChatRole.ASSISTANT,
				content: result.answer,
				dttm: new Date().toString(),
				chatId: data.id
			});
			prompt = '';

			// 답변의 분류가 비자 / 체류, 출입국 증명, 행정 심판 중 하나라면 연결 토스트를 띄워준다.
			if (
				result.category === QuestionCategory.VISA ||
				result.category === QuestionCategory.CERTIFICATE ||
				result.category === QuestionCategory.ADMINSTRATIVE_APPEAL
			) {
				toast.info($t('common.administrative.help'), {
					action: { label: $t('common.button.continue'), onClick: () => goto('/administrative') }
				});
			}
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

		const chatScroll = document.querySelector('#chat-detail-scroll');
		if (chatScroll) {
			chatScroll.scrollTo({
				top: chatScroll.scrollHeight,
				behavior: 'smooth'
			});
		}
	};

	// keydown 때 입력된 엔터가 반영되지 않도록 keyup 사용
	const handleTextareaKeyup = (e: KeyboardEvent) => {
		if (e.key === 'Enter') handleSumbit();
	};
</script>

<div class="flex h-full w-full max-w-[1080px] flex-col justify-start gap-10">
	<h1 class="mt-20 text-center text-h4">GoChung</h1>
	<div
		class="h-[calc(100vh_-_450px)] overflow-y-auto desktop:h-[calc(100vh_-_350px)]"
		id="chat-detail-scroll"
	>
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
				<div class="chat chat-start" id="answer-wating-bubble">
					<div class="chat-bubble chat-bubble-accent">
						<span class="loading loading-dots"></span>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex h-[150px] w-full max-w-[1080px] flex-col gap-2">
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
