import bcrypt from "bcrypt"
export function isValidPassword(password) {
    const regex = /^[A-Za-z0-9_@$]{5,}$/;
    return regex.test(password);
}

export async function convertHash(password){
    return await bcrypt.hash(password, 10)
}

export async function isPasswordSame(pass,hash) {
     return await bcrypt.compare(pass,hash)
}