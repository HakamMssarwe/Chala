export const ValidatePassword = (password) =>{


    if (password?.length < 6)
       return {isValid:false, errorMessage:"Password length must be at least 6 characters long."};
    
    if (password?.length > 12)
        return { isValid: false, errorMessage: "Password length must be at max 12 characters long." };


    return {isValid:true}
}