class User {
    constructor(uid, pwd) {
        this.uid = uid;
        this.pwd = pwd;
    }

    displayAll(){
        console.log(this.uid);
        console.log(this.pwd);
    }
}