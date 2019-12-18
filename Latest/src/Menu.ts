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
        this.button_n_list = ["one", "two", "three", "four"]
        this.button_index = 0
    }

    make_body(){
        this.body = document.createElement("div");
        this.body.className = this.menu_class;
    }
    
    make_and_append_button(){
        let new_button = document.createElement("div");
        new_button.classList.add(this.uni_button_class);
        this.button_index += 1
        let only_button_class = this.uni_button_class + this.button_n_list[this.button_index]
        new_button.classList.add(only_button_class);

        this.body.appendChild(new_button);
    }

    make_append_menubar(){
        menu.make_body()
        
        // 読み書き
        menu.make_and_append_button()
        // 全ノードの表示・非表示
        menu.make_and_append_button()
        // 共有範囲指定
        menu.make_and_append_button()
        // ノードの表示・非表示
        menu.make_and_append_button()

        menu.appendmenubar()
    }

    appendmenubar(){
        document.body.append(this.body)
    }
}