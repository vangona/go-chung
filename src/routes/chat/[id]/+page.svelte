<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { ChatRole, type ChatData } from '$lib/types/chat';
	import { cn, deepArrParse } from '$lib/utils';
	import { onMount } from 'svelte';

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

<div class="flex h-full w-full flex-col gap-20">
	<h1 class="text-h4">채팅 페이지</h1>
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
						{item.content}
					</div>
				</div>
			{/each}
		{/if}
	</div>
	<div class="absolute bottom-5">
		<Textarea bind:value={prompt} placeholder="궁금한거 물어보세요" />
	</div>
</div>
