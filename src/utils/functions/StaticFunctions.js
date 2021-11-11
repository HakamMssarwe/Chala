export const ValidatePassword = (password) =>{


    if (password?.length < 6)
       return {isValid:false, errorMessage:"Password length must be at least 6 characters long."};
    
    if (password?.length > 12)
        return { isValid: false, errorMessage: "Password length must be at max 12 characters long." };

    return {isValid:true}
}

export const ValidateEmail = (email) =>{

    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         
    if (!emailFormat.test(String(email).toLowerCase()))
        return {isValid:false, errorMessage:"Invalid email address."};

    return {isValid:true}
    
}


//A function that valdiates if a string has only alphabetic characters, no numbers, no symbols.
export const StringIsAlphabetic = (string) => {

    const stringFormat = /^[A-Za-z]+$/;

    if (!stringFormat.test(String(string).toLowerCase()))
    {
        return {isValid:false, errorMessage:"Numbers and symbols shouldn't be included."};
    }

    return {isValid:true}
}

