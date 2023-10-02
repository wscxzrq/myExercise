class User {
    @require
    @range(3,5)
    @description('账号')
    loginid:string; // 必须是 3-5 个字符


    loginpwd:string; // 必须是 6-12 个字符
    age:number; // 必须是数字，并且必须是 0-100 之间
    gender:"男"|"女"


}

/**
 * 统一的验证函数
 * @param obj 
 */
function validate(obj:object) {
    for (const key in obj) {
        const val = obj[key];
    }
}
const u = new User();

// 对用户对象中的数据进行验证