class User {
    static users:User[] = [];
    constructor(
        public loginId:string, 
        public loginPwd:string,
        public name:string,
        public age:number) { 
            // 需要将新建的用户加入到数组中
            User.users.push(this)
        }
    static login(loginId:string,loginPwd:string):User | undefined {
        return  User.users.find(u => u.loginId == loginId && u.loginPwd == loginPwd)
    } 

    sayHello() {
        console.log(`大家好，我叫${this.name},今年${this.age}岁，我的账号是${this.loginId}`);
    }
}

const result = User.login('xxx','abnc')

const u1 = new User('u1','bbb','王富贵',11)
const u2 = new User('u2','bbb','坤坤',18)
const u3 = new User('u3','bbb','旺财',22)

u1.sayHello()
u2.sayHello()
u3.sayHello()

console.log('User.users',User.users)

const res = User.login('u1','bbb')
console.log('res',res)
if(res) {
    res.sayHello()
}


// 单例模式
class Board {
    width:number = 500
    height:number = 700

    init() {
        console.log('初始化棋盘');
    }
    private constructor() {

    }

    // static readonly singleBoard = new Board()
    private static _board?:Board;

    static createBoard():Board {
        if(this._board) {
            return this._board
        }
        return this._board = new Board();
    }
}

const b1 = Board.createBoard()
const b2 = Board.createBoard()
console.log('b1 === b2', b1 === b2);









