class Menu_Node{

    body: HTMLElement;
    menu_class: string;
    button_n_list: string[];
    button_index: number;
    uni_button_class: string;
    img_root: HTMLElement;
    img_count: number;
    img_url: string;
    
    constructor(){
        this.body = document.createElement("div");
        this.menu_class = "latest_menubar"
        this.uni_button_class = "latest_button"
        this.button_n_list = ["one", "two", "three", "four","five", "six", "seven"]
        this.button_index = 0
        this.img_root = document.documentElement;
        this.img_count = 1
        this.img_url = chrome.extension.getURL('img/'); //共通するURLを取得
    }

    make_body(){
        this.body = document.createElement("div");
        this.body.className = this.menu_class;
    }

    make_and_append_button(set_function: ()=>void){
        let new_button = document.createElement("div");
        new_button.classList.add(this.uni_button_class);
        let only_button_class = this.uni_button_class + "--" + this.button_n_list[this.button_index]
        this.button_index += 1
        new_button.classList.add(only_button_class);
        new_button.onclick = function() {
            set_function()
        }

        this.body.appendChild(new_button);
    }

    appendmenubar(){
        document.body.append(this.body)
    }
    
    get_img(img_name: string){
        let css_img_id = "--eyeurl" + this.img_count;
        let target_img_url = "url(" + this.img_url + img_name + ")"
        console.log("DEBUG: css_img_id = " + css_img_id)
        console.log("DEBUG: url = " + target_img_url)
        this.img_count += 1
        this.img_root.style.setProperty(css_img_id, target_img_url);
    }
}