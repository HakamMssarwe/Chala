import axios, {AxiosError, AxiosResponse} from "axios";
import { API_URL } from "../../constants/server";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function HttpRequest(url:string, method:any, data:any) {

   let token = "";

	let jsonValue = await AsyncStorage.getItem('@chala');
	let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
	token = storageData?.token;

	
	return axios
		.request({
			method: method,
			baseURL: API_URL,
			url: url,
			data: data,
			headers: {
				Authorization: "Bearer " + token
			 }
		})
		.then((result: AxiosResponse) => {
			return Promise.resolve(result);
		})
		.catch((err: AxiosError) => {
			return Promise.reject(err.response);
		});
}