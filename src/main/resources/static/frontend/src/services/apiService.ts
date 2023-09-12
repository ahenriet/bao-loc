import { Result } from "../model/Result";

const baseURI: string = 'api/results';

export const computeResults = async (): Promise<Response> => {
	const response = await fetch(baseURI, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	checkResponseIsOkOrNotAcceptable(response);
	return response;
}

export const deleteResult = async (id: number): Promise<void> => {
	const response = await fetch(`${baseURI}/${id}`, {
		method: 'DELETE'
	});

	checkResponseIsOkOrNotAcceptable(response);
}

export const updateResult = async (id: number, resultToUpdate: Result): Promise<Response> => {
	const response = await fetch(`${baseURI}/${id}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(resultToUpdate)
	});

	checkResponseIsOkOrNotAcceptable(response);
	return response;
}


function checkResponseIsOkOrNotAcceptable(response: Response) {
	if (!response.ok && response.status !== 406) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}
}