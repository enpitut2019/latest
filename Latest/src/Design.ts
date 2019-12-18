class Design{
    constructor(){

    }

    // set_Style_〇〇と言った形で実装。〇〇には対象となるノードのIDを使用。
    /*
    set_Style_menubar(target_node: HTMLElement): HTMLElement{
        target_node.style = ~~~
        // 以下略

        return target_node
    }
     */

    set_Style(target_node: HTMLElement): HTMLElement{
        return target_node;
    }

    set_Style_html_element(target_node: HTMLElement): HTMLElement{
        target_node.style.padding = "10px"
        target_node.style.marginBottom = "10px"
        target_node.style.border = "1px solid #333333"
        target_node.style.backgroundColor = "#ffff99"
        return target_node;
    }
    
}