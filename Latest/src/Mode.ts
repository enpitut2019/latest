class Mode{
    flag: string;

    constructor(){
        this.flag = "read";
    }

    /**
     * 状態を変更するための関数
     * @param command セットした状態
     */
    Change_mode(command: string){
        if (command != "wirte" && command != "read"){
            this.flag = "read"
        }
        this.flag = command
    }

    /**
     * 指定したモードになっているかどうかを返す
     * @param mode 確かめるモード
     */
    Judge_mode(mode: string){
        if(this.flag == mode){
            return true
        }else{
            return false
        }
    }
}
