function User (userName,password) {
    this.userName = userName;
    this.password = password;
}
User.prototype.show = function () {
  console.log('播放免费视频');
}

function VipUser(userName,password,date) {
    User.call(this,userName,password);
    this.date = date;
}
VipUser.prototype.payShow = function () {
  console.log('播放付费视频');
}
// VipUser.prototype.__proto__ = User.prototype;
Object.setPrototypeOf(VipUser.prototype,User.prototype);
let vip = new VipUser('张三','123','2023-10-01');
console.log('vip',vip)
vip.show();