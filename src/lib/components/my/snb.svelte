<script lang="ts">
	import { goto } from '$app/navigation';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card/index';
	import { LOCALSTORAGE_PREFIX } from '$lib/constants/common';
	import { getValuesWithKeySubstring, deepArrParse } from '$lib/utils';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import { t } from 'svelte-i18n';
	import { BookUser, Home, MessageCircle } from 'lucide-svelte';

	let parsedLocalDataArr: Array<Array<import('$lib/types/chat').ChatData>>;
	onMount(() => {
		const localDataArr = getValuesWithKeySubstring(LOCALSTORAGE_PREFIX);
		parsedLocalDataArr = localDataArr.map((data) =>
			data.value ? deepArrParse(data.value) : []
		) as Array<Array<import('$lib/types/chat').ChatData>>;
	});

	const getLastChatHistory = (chatData: Array<unknown>): import('$lib/types/chat').ChatData => {
		return chatData[chatData.length - 1] as import('$lib/types/chat').ChatData;
	};

	const handleCardClick = (chatId: string) => {
		goto('/chat/' + chatId);
	};
</script>

<aside class="hidden max-h-full w-[320px] flex-col border-r desktop:flex">
	<header class="my-5 flex h-[300px] w-full flex-col justify-center gap-2 px-5">
		<h2 class="mb-5 text-h1">GoChung</h2>
		<a href="/" class="btn btn-secondary"><Home color="white" /></a>
		<a href="/chat" class="btn btn-secondary"><MessageCircle color="white" /></a>
		<a href="/administrative" class="btn btn-secondary"><BookUser color="white" /></a>
	</header>
	<Separator />
	<main class="w-full">
		{#if parsedLocalDataArr && parsedLocalDataArr.length > 0}
			<ScrollArea class="h-[calc(100vh_-_300px)] px-5 pt-5" type="always">
				{#each parsedLocalDataArr as chatData}
					<Card.Root class="mb-2">
						<Card.Header>
							<Card.Title class="text-nowrap text-body2">
								{dayjs(getLastChatHistory(chatData).dttm).format('YYYY.MM.DD')}
								{$t('page.chat.chat-history')}
							</Card.Title>
						</Card.Header>
						<Card.Footer>
							<button
								class="btn btn-primary w-full"
								on:click={() => handleCardClick(getLastChatHistory(chatData).chatId)}
							>
								{$t('common.button.continue')}</button
							>
						</Card.Footer>
					</Card.Root>
				{/each}
			</ScrollArea>
		{:else}
			<div class="flex w-full justify-center pt-5">
				{$t('common.info.no-data')}
			</div>
		{/if}
	</main>
</aside>
