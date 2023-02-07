import axios, { AxiosHeaders } from 'axios'

export function useAxios(baseUrl: string, headers?: AxiosHeaders) {
	const httpRequest = axios.create({
		baseURL: baseUrl,
		headers: headers
	})

	async function getData(url: string, entryHeaders?: { [key: string]: string }) {
		const { data, headers } = await httpRequest.get(url, { headers: { ...entryHeaders } })
		return { data, headers }
	}

	async function postData(url: string, entryData: object, entryHeaders?: { [key: string]: string }) {
		const { data, headers } = await httpRequest.post(url, entryData, { headers: { ...entryHeaders } })
		return { data, headers }
	}

	async function putData(url: string, entryData: object, entryHeaders?: { [key: string]: string }) {
		const { data, headers } = await httpRequest.put(url, entryData, { headers: entryHeaders })
		return { data, headers }
	}

	async function deleteData(url: string, entryHeaders?: { [key: string]: string }) {
		const { data, headers } = await httpRequest.delete(url, { headers: entryHeaders })
		return { data, headers }
	}

	return { deleteData, getData, postData, putData }
}
