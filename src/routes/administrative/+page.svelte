<script lang="ts">
	import { t } from 'svelte-i18n';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	let searchKeyword: string = '';
	let selectedCategory: string;
	let selectedLanguage: string;

	const dummyData = [
		{
			name: '김현우',
			content:
				'20년 경력의 베테랑 행정사로, 복잡한 행정 절차를 신속하고 정확하게 처리합니다. 외국인 고객을 위한 이민 및 비자 문제 전문.',
			language: ['ko', 'en'],
			category: ['visa', 'entrance', 'judgement', 'life', 'welfare']
		},
		{
			name: '박승훈',
			content:
				'젊고 유능한 행정사로, 최신 법규와 정책에 대한 깊은 이해를 바탕으로 고객의 문제를 해결합니다. 국제 무역 및 수출입 관련 업무에 강점.',
			language: ['ko', 'zh-Hans'],
			category: ['entrance', 'life', 'welfare']
		},
		{
			name: '이정민',
			content:
				'다양한 경험을 바탕으로 한 창업 및 기업 설립 지원 전문가입니다. 법률 상담 및 비즈니스 전략 자문 서비스 제공.',
			language: ['ko', 'ja'],
			category: ['visa', 'judgement']
		},
		{
			name: '최수진',
			content:
				'교육 관련 행정 절차 전문가로, 유학생 비자 및 교육기관 설립 지원에 특화되어 있습니다. 친절하고 상세한 상담 제공.',
			language: ['ko', 'th'],
			category: ['judgement', 'life', 'welfare']
		},
		{
			name: '정다은',
			content:
				'민원 해결 및 공공서비스 접근성 향상에 주력하는 행정사입니다. 다문화 가정 지원 및 사회복지 관련 업무에 능숙.',
			language: ['ko', 'vi'],
			category: ['entrance', 'judgement', 'life']
		},
		{
			name: '한승훈',
			content:
				'부동산 관련 행정 절차 전문가로, 상업용 및 주거용 부동산 거래를 지원합니다. 공증 및 계약서 작성 서비스 제공.',
			language: ['ko', 'en', 'zh-Hans'],
			category: ['visa', 'entrance', 'judgement', 'life', 'welfare']
		},
		{
			name: '송민지',
			content:
				'교통 및 환경 관련 행정 절차에 특화된 전문가입니다. 다양한 정부 허가 및 인허가 업무를 신속하게 처리합니다.',
			language: ['ko', 'ja', 'vi'],
			category: ['visa', 'entrance', 'judgement']
		},
		{
			name: '윤지석',
			content:
				'세무 및 회계 관련 행정 절차 전문가로, 중소기업과 개인사업자의 세금 문제를 해결합니다. 정확하고 신뢰할 수 있는 서비스 제공.',
			language: ['ko', 'en', 'th'],
			category: ['visa', 'entrance', 'life', 'welfare']
		}
	];
</script>

<div class="flex h-full w-full max-w-[860px] flex-col justify-start gap-5 pt-[100px]">
	<label class="input input-bordered flex items-center gap-2">
		<input
			type="text"
			class="grow"
			placeholder={$t('common.input.search')}
			bind:value={searchKeyword}
		/>
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
		<select class="select select-bordered" bind:value={selectedCategory}>
			<option disabled selected value="default">{$t('common.select.category')}</option>
			<option value="visa">{$t('common.category.visa')}</option>
			<option value="entrance">{$t('common.category.entrance')}</option>
			<option value="judgement">{$t('common.category.judgement')}</option>
			<option value="life">{$t('common.category.life')}</option>
			<option value="welfare">{$t('common.category.welfare')}</option>
		</select>
		<select class="select select-bordered" bind:value={selectedLanguage}>
			<option disabled selected value="default">{$t('common.select.available-languages')}</option>
			<option value="ko">{$t('common.languages.ko')}</option>
			<option value="en">{$t('common.languages.en')}</option>
			<option value="ja">{$t('common.languages.ja')}</option>
			<option value="zh-Hans">{$t('common.languages.zh-Hans')}</option>
			<option value="vi">{$t('common.languages.vi')}</option>
			<option value="th">{$t('common.languages.th')}</option>
		</select>
	</div>
	<ScrollArea
		class="flex h-[calc(100vh_-_350px)] desktop:h-[calc(100vh_-_250px)] desktop:px-10"
		type="always"
	>
		<div class="flex justify-center">
			<div class="grid w-fit grid-cols-1 gap-5 desktop:grid-cols-2">
				{#each dummyData.filter((data) => {
					return (selectedCategory === 'default' || data.category.includes(selectedCategory)) && (selectedLanguage === 'default' || data.language.includes(selectedLanguage)) && (searchKeyword.trim() === '' || data.content.includes(searchKeyword));
				}) as data, index}
					<div class="card card-side bg-base-100 shadow-xl">
						<figure class="flex h-fit w-[420px] flex-col">
							<img src={`/image/adminstrative-profile-${index + 1}.webp`} alt="행정사 이미지" />
							<div class="flex flex-wrap gap-1 px-2 py-3">
								{#each data.language as language}
									<span class="badge badge-accent text-overline"
										>{$t(`common.languages.${language}`)}</span
									>
								{/each}
							</div>
						</figure>
						<div class="card-body p-5">
							<h2 class="card-title">{data.name}</h2>
							<p>{data.content}</p>
							<div class="card-actions justify-end">
								<button class="btn btn-primary">{$t('common.button.consulting')}</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</ScrollArea>
</div>
