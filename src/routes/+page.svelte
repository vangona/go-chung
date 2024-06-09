<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex w-full flex-col justify-center gap-20">
	<div class="flex flex-col gap-20">
		<div class="flex flex-col justify-center gap-2">
			<div class="chat chat-start flex translate-x-20 justify-center">
				<div class="chat-bubble chat-bubble-primary">
					{$t('page.home.welcome')}
				</div>
			</div>
			<div class="text-h1 text-center">GoChung</div>
		</div>
		<div class="flex justify-center">한국 살이에 궁금한 것들을 물어보세요.</div>
	</div>
	<div class="flex flex-col gap-5">
		<Textarea placeholder="궁금한거 물어보세요" />
		<Button>물어보기</Button>
	</div>
</div>
