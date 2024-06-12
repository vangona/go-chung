<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	const dummyData = new Array(20);
</script>

<div class="mt-10 flex w-full max-w-[860px] flex-col gap-5">
	<label class="input input-bordered flex items-center gap-2">
		<input type="text" class="grow" placeholder="Search" />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70"
			><path
				fill-rule="evenodd"
				d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
				clip-rule="evenodd"
			/></svg
		>
	</label>
	<div class="flex justify-between gap-5 desktop:justify-end">
		<select class="select select-bordered">
			<option disabled selected>카테고리</option>
			<option>Star Wars</option>
			<option>Harry Potter</option>
			<option>Lord of the Rings</option>
			<option>Planet of the Apes</option>
			<option>Star Trek</option>
		</select>
		<select class="select select-bordered">
			<option disabled selected>사용가능 언어</option>
			<option>Star Wars</option>
			<option>Harry Potter</option>
			<option>Lord of the Rings</option>
			<option>Planet of the Apes</option>
			<option>Star Trek</option>
		</select>
	</div>
	<ScrollArea class="flex h-[80vh]">
		<div class="flex justify-center">
			<div class="grid w-fit grid-cols-2 gap-5">
				{#each dummyData as data}
					<div class="card w-96 bg-base-100 shadow-xl">
						<figure>
							<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
								alt="Shoes"
							/>
						</figure>
						<div class="card-body">
							<h2 class="card-title">Shoes!</h2>
							<p>If a dog chews shoes whose shoes does he choose?</p>
							<div class="card-actions justify-end">
								<button class="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</ScrollArea>
</div>
