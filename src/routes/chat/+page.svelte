<script lang="ts">
	import { t } from 'svelte-i18n';
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
		goto('/chat/' + chatId);
	};
</script>

<ScrollArea class="mt-20 h-[calc(100vh_-_200px)] desktop:h-[calc(100vh_-_100px)]" type="always">
	<div class="my-1 flex max-w-[1080px] flex-col gap-3">
		{#if parsedLocalDataArr && parsedLocalDataArr.length > 0}
			{#each parsedLocalDataArr as chatData}
				<Card.Root>
					<Card.Header>
						<Card.Title>
							{dayjs(getLastChatHistory(chatData).dttm).format('YYYY.MM.DD')}
							{$t('page.chat.chat-history')}
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
					<Card.Footer>
						<button
							class="btn btn-primary w-full"
							on:click={() => handleCardClick(getLastChatHistory(chatData).chatId)}
							>{$t('common.button.continue')}</button
						>
					</Card.Footer>
				</Card.Root>
			{/each}
		{:else}
			<div>데이터가 없습니다.</div>
		{/if}
	</div>
</ScrollArea>
