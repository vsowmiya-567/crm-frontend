//emailRegex = /^[^\s@]+@[^\s@]+$/;
// passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const emailValidation  = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    emailRegex.test(email)
  }
 
  export const passwordValidation  = (password)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    emailRegex.test(password)
  }
 
  