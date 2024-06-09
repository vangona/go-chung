<script lang="ts">
	import { getValuesWithKeySubstring, deepArrParse, cn } from '$lib/utils';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import * as Card from '$lib/components/ui/card/index';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { goto } from '$app/navigation';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	let parsedLocalDataArr: Array<Array<ChatData>>;
	onMount(() => {
		const localDataArr = getValuesWithKeySubstring(LOCALSTORAGE_PREFIX);
		parsedLocalDataArr = localDataArr.map((data) =>
			data.value ? deepArrParse(data.value) : []
		) as Array<Array<ChatData>>;
	});

	const getLastChatHistory = (chatData: Array<unknown>): ChatData => {
		return chatData[chatData.length - 1] as ChatData;
	};

	const handleCardClick = (chatId: string) => {
		console.log(123);
		goto('/chat/' + chatId);
	};
</script>

<ScrollArea class="h-[80vh]" type="hover">
	<div class="mx-5 my-1 flex flex-col gap-3">
		{#if parsedLocalDataArr}
			{#each parsedLocalDataArr as chatData}
				<Card.Root
					class="transition hover:scale-[1.01] hover:cursor-pointer"
					on:click={() => handleCardClick(getLastChatHistory(chatData).chatId)}
				>
					<Card.Header>
						<Card.Title>
							{dayjs(getLastChatHistory(chatData).dttm).format('YYYY.MM.DD')}의 대화 기록
						</Card.Title>
					</Card.Header>
					<Card.Content>
						{#each chatData.slice(-2) as item}
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
					</Card.Content>
				</Card.Root>
			{/each}
		{/if}
	</div>
</ScrollArea>
