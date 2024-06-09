<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';

	let prompt: string = '';

	const handleAskClick = () => {
		const chatId = uuidv4();
		window.confirm(`clicked\nprompt : ${prompt}\nchatId : ${chatId}`) && goto('/chat/' + chatId);
	};
</script>

<div class="flex w-full flex-col justify-center gap-20">
	<div class="flex flex-col gap-20">
		<div class="flex flex-col justify-center gap-2">
			<div class="chat chat-start flex translate-x-20 justify-center">
				<div class="chat-bubble chat-bubble-primary">
					<!-- {$t('page.home.welcome')} -->
					안녕하세요
				</div>
			</div>
			<div class="text-h1 text-center">GoChung</div>
		</div>
		<div class="flex justify-center">한국 살이에 궁금한 것들을 물어보세요.</div>
	</div>
	<div class="flex flex-col gap-5">
		<Textarea bind:value={prompt} placeholder="궁금한거 물어보세요" />
		<Button on:click={handleAskClick} class="active:scale-[0.99]">물어보기</Button>
	</div>
</div>
