
// LOGOUT
// export const logout = () => {
//     const check = JSON.parse(localStorage.getItem('check'))
//     if( check === true ) return true;
//     return false;
// }

// LOGIN STATUS
export const isLogin = () => {
    const task = JSON.parse(localStorage.getItem('task'))
    const check = JSON.parse(localStorage.getItem('check'))
    if(task === null && check === true ) return true;
    return false;
}