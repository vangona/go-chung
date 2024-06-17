export enum QuestionCategory {
	VISA = 'visa',
	LIVING_INFO = 'living_info',
	CERTIFICATE = 'certificate',
	ADMINSTRATIVE_APPEAL = 'administrative_appeal',
	COMPLAINTS = 'complaints'
}

export type AnswerApi = {
	answer: string;
	category: QuestionCategory;
};
