<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { cn, deepArrParse } from '$lib/utils';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

	/** @type {import('./$types').PageData} */
	export let data;

	let chatData: Array<ChatData> | undefined;
	let prompt: string;

	onMount(() => {
		const localData = localStorage.getItem(data.id);
		console.log(localData);
		chatData = deepArrParse<ChatData>(localData ?? '');
	});
</script>

<div class="flex h-full w-full flex-col gap-10">
	<h1 class="mt-10 text-center text-h4">GoChung</h1>
	<ScrollArea class="h-[70vh]">
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
		</div>
	</ScrollArea>
	<div class="fixed bottom-[100px] w-[calc(100vw_-_80px)]">
		<Textarea bind:value={prompt} placeholder="궁금한거 물어보세요" />
	</div>
</div>
