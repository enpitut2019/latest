class Mode{
    flag: string;
    form_unmake: boolean;

    constructor(){
        this.flag = "read";
        this.form_unmake = true;
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

    Change_unmake(){
        if(this.form_unmake){
            this.form_unmake = false;
        }else{
            this.form_unmake = true;
        }
    }

    Change_reverse_mode(): void{
        
        console.log("DEBUG: Mode" + this.flag)

        if(this.flag == "read"){
            this.flag = "write"
        }else{
            this.flag = "read"
        }
    }
}
