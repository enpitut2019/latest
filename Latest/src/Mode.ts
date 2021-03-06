class Mode{
    flag: string;
    writing: boolean;
    menu: Menu_Node;

    constructor(munu: Menu_Node){
        this.flag = "read";
        this.writing = false;
        this.menu = menu;
    }

    /**
     * 状態を変更するための関数
     * @param command セットした状態
     */
    Change_mode(command: string){
        if(command=="none"){
            this.menu.nondisplay_menubar()
        }else{
            this.menu.display_menubar()
        }
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

    Writing_mode(){
        if(this.writing){
            this.writing = false;
        }else{
            this.writing = true;
        }
    }

    Change_reverse_mode(): void{
        if (this.writing){
            return;
        }
        const target_node = document.getElementsByClassName("latest_button--one");
        console.log("DEBUG: Mode: flag = " + this.flag)

        if(this.flag == "read"){
            this.flag = "write"
            $(target_node).toggleClass("latest_button--five")
        }else{
            this.flag = "read"
            $(target_node).toggleClass("latest_button--five")
        }
    }
}
