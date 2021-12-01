import axios, {AxiosError, AxiosResponse} from "axios";
import { API_URL } from "../../constants/server";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";

export default async function HttpRequest(url:string, method:any, data:any) {


	

   let token = "";

	let jsonValue = await AsyncStorage.getItem('@chala');
	let storageData = jsonValue != null ? await JSON.parse(jsonValue) : null;
	token = storageData?.token;


	let response = await axios.request({
		method: method,
		baseURL: API_URL,
		url: url,
		data: data,
		headers: {
			Authorization: 'Bearer ' + token,
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		  }
	})
		.then((result: AxiosResponse) => {
			return Promise.resolve(result);
		})
		.catch((err: AxiosError) => {
			return Promise.resolve(err.response);
		});

		
	return response;
}