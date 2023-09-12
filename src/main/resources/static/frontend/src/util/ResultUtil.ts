import { Result } from "../model/Result";

export const stringifyResult = (r: Result): string => {
	return "" + r.first + r.second + r.third + r.fourth + r.fifth + r.sixth + r.seventh + r.eighth + r.ninth;
}

export const parseResult = (s: string) => {
	return {
		first: s[0],
		second: s[1],
		third: s[2],
		fourth: s[3],
		fifth: s[4],
		sixth: s[5],
		seventh: s[6],
		eighth: s[7],
		ninth: s[8],
	}
}