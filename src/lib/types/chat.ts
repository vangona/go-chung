export enum ChatRole {
	USER = 'user',
	ASSISTANT = 'assistant',
	SYSTEM = 'system'
}

export interface ChatData {
	role: ChatRole;
	content: string;
	dttm: string;
	chatId: string;
}
