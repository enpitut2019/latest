class Menu_Node{

    body: HTMLElement;
    menu_class: string;
    button_n_list: string[];
    button_index: number;
    uni_button_class: string;
    
    constructor(){
        this.body = document.createElement("div");
        this.menu_class = "latest_menubar"
        this.uni_button_class = "latest_button"
        this.button_n_list = ["one", "two", "three", "four","five"]
        this.button_index = 0
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
}