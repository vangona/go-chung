import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const deepArrStringify = (arr: Array<unknown>): string => {
	arr = arr.map((el) => {
		if (typeof el === 'object') return JSON.stringify(el);
		return el;
	});
	return JSON.stringify(arr);
};

export const deepArrParse = <T>(str: string): Array<T> | undefined => {
	let resultArr = JSON.parse(str);
	if (!Array.isArray(resultArr)) undefined;

	resultArr = resultArr.map((el: string) => JSON.parse(el));
	return resultArr;
};

export const getValuesWithKeySubstring = (substring: string) => {
	const matchingValues = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key) return matchingValues;

		if (key.includes(substring)) {
			const value = localStorage.getItem(key);
			matchingValues.push({ key, value });
		}
	}
	return matchingValues;
};

export const checkIsValidPrompt = (prompt: string) => {
	return Boolean(prompt) && Boolean(prompt.trim());
};
