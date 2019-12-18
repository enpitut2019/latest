class Menu_Node{

    body: HTMLElement;

    constructor(){
        this.body = new HTMLElement();
    }

    make_body(){
        this.body = document.createElement("div");
    }
}