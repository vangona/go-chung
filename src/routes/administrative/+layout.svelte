<script lang="ts">
	import { Home } from 'lucide-svelte';
	import { MessageCircle } from 'lucide-svelte';
	import { BookUser } from 'lucide-svelte';
</script>

<slot />
<div
	class="absolute bottom-0 flex h-20 w-full items-center justify-between bg-secondary px-10 desktop:hidden"
>
	<a href="/home" class="btn btn-ghost"><Home color="white" /></a>
	<a href="/chat" class="btn btn-ghost"><MessageCircle color="white" /></a>
	<a href="/administrative" class="btn btn-ghost"><BookUser color="white" /></a>
</div>
