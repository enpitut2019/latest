/**
 * element作成の親クラス
 */
class HTML_Element {

    uniid: string;
    id: string;
    node: HTMLElement;
    z: string;
    type: string;
    element_type: string;
    url: string;
    class: string;
    
    /**
     * elementを作成する。(idとzは必ず指定する)
     * @param id elementがもつid属性
     * @param z 重なり順
     * @param url コメントのurl(作成時は""でok)
     * @param type elementのタイプ("PIN"や"close")
     * @param element_type elementの属性(基本的に"div") 
     * @param click_function クリックしたときに発動する関数(指定しなくても良い)
     */
    constructor(id: string, z: string, url: string = "", type: string = "", element_type:string = "div", class_name:string = ""){
        // elementの作成
        this.node = document.createElement(element_type);
        this.uniid = id;
        this.id = this.make_id(id, type);
        this.z = z;
        this.type = type;
        this.element_type = type;
        this.url = url;
        this.class = class_name;
    }

    set_Value(){
        // idの付与
        this.node.id = this.id
        // z位置(重なり順を決定)
        this.node.style.zIndex = this.z
        this.node.className = this.class
    }

    /**
     * 指定した値分zIndex(重なり順)を追加
     * @param add_num 加えるz値
     */
    add_zIndex(add_num: number){
        let current_zIndex = this.node.style.zIndex
        this.node.style.zIndex = String(Number(current_zIndex)+add_num)
    }
    
    /**
     * ノードにidをセットする。
     */
    set_style(){
        this.node.style.padding = "10px"
        this.node.style.marginBottom = "10px"
        this.node.style.border = "1px solid #333333"
        this.node.style.backgroundColor = "#ffff99"
    }

    set_buttonstyle(){// 161行目で使用
        //丸スタイル
        this.node.style.display = "inline-block"
        this.node.style.textDecoration = "none"
        this.node.style.background = "#ff8181"
        this.node.style.color = "#FFF"
        this.node.style.width = "15px"
        this.node.style.height = "15px"
        this.node.style.lineHeight = "15px"
        this.node.style.borderRadius = "50%"
        this.node.style.textAlign = "center"
        this.node.style.fontWeight = "bold"
        this.node.style.overflow = "hidden"
        //this.node.style.boxShadow = "0px 1px 1px rgba(0,0,0,0.29)"
        //this.node.style.borderBottom = "solid 2px #bd6565"
        this.node.style.opacity = "0.8"
        this.node.style.border = "solid 3px rgba(0,0,0,0.6)"
    }

    /**
     * カーソルの表示方法を設定
     * @param type ノード上のカーソルの表示方法を指定
     */
    set_cursor(type: string){
        this.node.style.cursor = type
    }

    /**
     * show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
     * @param type ノードの表示状態を指定する
     */
    set_display(type: string){
        this.node.style.display = type
    }

    /**
     * 指定した関数をクリックしたときに発火する関数をセットする関数
     * @param click_function クリックしたときに発火する関数
     */
    set_Function(click_function: ()=>void){
        // elementをクリックしたときの関数を追加
        this.node.onclick = function(){
            click_function()
        }
    }

    /**
     * 指定したURLから画像をセットする関数
     * @param image セットするイメージの画像を指定する(本来は画像のURLを指定)
     */
    set_Image(image: string = "") {
        this.node.innerHTML = image
    }

    set_CurrentURL(){
        this.url = location.origin
    }

    /**
    * 指定したidのclose-idやPIN-idを返す
    * @param id コメントのid
    * @param add_id 追加したいid("close"or"PIN")
    */
   private make_id(id: string, add_id: string) :string{
       if (add_id == ""){
           return id
        }
        return id + "_" + add_id
    }
}

/**
 * PINを作成するためのclass
 */
class PIN_Node extends HTML_Element{

    x: string;
    y: string;
    set_function: ()=>void;

    /**
     * PINを作成する
     * @param id PINのid属性
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     * @param z pin-nodeのz座標
     */
    constructor(id: string, x: string, y: string, z: string, set_function: ()=>void, url :string = ""){
        super(id, z, url, "PIN", "div", "latest_pin")
        this.x = x;
        this.y = y;
        this.set_function = set_function;
    }
    
    set_Value(){
        super.set_Value()
        // 位置を付与(absolute)
        this.Set_Position_absolute(this.x, this.y)
        //// 表示する言葉(将来的には画像)
        //super.set_Image()
        // 見た目の設定
        //super.set_buttonstyle()
        super.set_cursor("pointer")
        // クリックしたときのアクションをセット
        super.set_Function(this.set_function)
        super.set_display("")
    }

    /**
     * pin-nodeの座標を指定する。
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     */
    private Set_Position_absolute(x: string, y: string) {
        this.node.style.position = "absolute"
        this.node.style.left = x+"px"
        this.node.style.top = y+"px"
    }
}

/**
 * コメントのノードを作成
 */
class Comment_Node extends HTML_Element{

    comment: string;
    add_zindex: number;

    constructor(id: string, z: string, comment: string, url :string = ""){
        super(id, z, "", "", "div", "latest_comment")
        this.comment = comment;
        this.add_zindex = 1;
    }

    set_Value(){
        super.set_Value()
        // コメントのスタイルを追加。(display="none"も追加)
        super.set_style()
        super.set_display("none")
        // コメントの内容を付与
        this.node.innerHTML = this.comment
        // zIndexを追加
        super.add_zIndex(this.add_zindex)
        this.node.style.color = "black"
    }
}

/**
 * コメントをクローズするためのノードを作成
 */
class Close_Node extends HTML_Element{

    add_zindex: number;
    set_function: ()=>void;

    constructor(id: string, z: string, set_function: ()=>void, url :string = ""){
        super(id, z, "", "close", "div", "latest_close")
        this.add_zindex = 2
        this.set_function = set_function
    }

    set_Value(){
        super.set_Value()
        // コメントのスタイルを追加。(display="none"も追加)
        //super.set_style()
        super.set_cursor("pointer")
        super.set_display("none")
        // 表示する言葉(将来的には画像)
        super.set_Image("x")
        // zIndexを追加
        super.add_zIndex(this.add_zindex)
        // このノードをクリックしたときに発火する関数を指定
        super.set_Function(this.set_function)        
    }
}

class Comments{
    id: string;
    comment_node: Comment_Node;
    cls_node: Close_Node;
    pin_node: PIN_Node;
    x: string;
    y: string;
    z: string;
    comment: string;
    url: string;
    
    /**
     * pin,comment,closeノードを作成するのに必要な値をセットする。
     * @param id ノードのid
     * @param x pinノードのx座標
     * @param y pinノードのy座標
     * @param z pinノードのz座標(重なり順)
     * @param comment commentノードに表示するコメント内容
     */
    constructor(id: string, x: string, y: string, z: string = "1000", comment: string, url: string = ""){
        this.comment_node = new Comment_Node(id, z, comment, url)
        this.cls_node = new Close_Node(id, z, this.close_comment.bind(this), url)
        this.pin_node = new PIN_Node(id, x, y, z,  this.Display_Comment.bind(this), url)
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.comment = comment;
        this.url = url;
    }

    /**
     * 各ノードを作成する。
     */
    createComments(){
        this.comment_node.set_Value()
        this.cls_node.set_Value()
        this.pin_node.set_Value()
    }

    /**
     * 作成したノードをサイトに追加する
     */
    appendComments(){
        document.body.appendChild(this.comment_node.node)
        document.body.appendChild(this.cls_node.node)
        document.body.appendChild(this.pin_node.node)
    }

    /**
     * コメントを新規作成時に実行。各ノードに現在のURLを格納
     */
    set_CurrentURL(){
        this.comment_node.set_CurrentURL();
        this.cls_node.set_CurrentURL();
        this.pin_node.set_CurrentURL();
        this.url = location.origin;
    }

    /**
    * コメントを表示させる関数
    */
    private Display_Comment(){
        let comment_id = this.comment_node.id
        $("#"+this.pin_node.id).on("click", function(e: { pageX: any; pageY: any; }){
            if ($("#"+comment_id).is(":hidden")){
                this.Move_Comment(e.pageX, e.pageY, this.id)
            }
        }.bind(this));
    }

    /**
    * コメントとバツマークを指定した位置に表示させる。
    * @param x 指定したx座標
    * @param y 指定したy座標
    * @param id クリックしたPINに対応したコメントのid属性
    */
    private Move_Comment(x: number, y: number, id: string) {
        // 対象のidのコメントとそのコメントのバツマークを表示状態に変更
        $("#"+this.comment_node.id).show();
        $("#"+this.cls_node.id).show();

        // 指定の位置にコメントを移動
        this.Set_Position_jQuery(x, y, this.comment_node.id);

        // バツマークの移動座標を計算
        let cls_btn_x = x
        // コメントの幅を取得
        let target_width = $("#"+this.comment_node.id).outerWidth(true)
        // コメントの幅が取得できればその分右にずらす
        if (target_width != undefined){
            cls_btn_x += target_width - 5
        }
        let cls_btn_y = y - 5
        // 指定の位置の右上にバツマークを移動
        this.Set_Position_jQuery(cls_btn_x, cls_btn_y, this.cls_node.id);
    }

    /**
     * コメントをクローズするための関数
     */
    close_comment() {
        if ($("#"+this.cls_node.id).is(":visible")){
            $("#"+this.cls_node.id).hide()
            $("#"+this.comment_node.id).hide()
        }
    }

    /**
     * 対象となるノードの座標を変更する。
     * @param x 対象のx座標
     * @param y 対象のy座標
     * @param id 対象のid属性
     */
    private Set_Position_jQuery(x: number, y: number, id: string){
        $("#"+id).css({
            "position": "absolute",
            "left": x,
            "top": y
        })
    }
}

class CommentManager{
    
    private db: DB
    private manageid: ManageID
    private current_url: string
    private all_node: Comments[]
    
    /**
     * db関係の変数を渡す。
     */
    constructor(){
        this.db = new DB()
        this.manageid = new ManageID()
        this.current_url = location.origin
        this.all_node = []
    }

    /**
     * 各ノードを作成する。
     */
    createComments(id: string, x: string, y: string, z: string = "1000", comment: string, url: string){
        if (id == undefined) return;
        let node = new Comments(id, x, y, z, comment, url)
        console.log("DEBUG: CreateComment = {id = " + id + ",x = " + x + ",y = " + y + ",z = " + z + ",comment = " + comment + ",url = " + url + "}");
        node.createComments()
        node.appendComments()
        this.all_node.push(node)
    }

    /**
     * 新しいノードをサイトに追加した後、データベースに追加する
     */
    creteNewComments(x: string, y: string, z: string = "1000", comment: string){
        let id = this.manageid.get_Random_id()
        let [relative_x, relative_y] = this.Change_from_abs_to_rel(Number(x), Number(y));
        console.log("DEBUG: relative_x = "+relative_x + ", relative_y = " + relative_y)
        let node = new Comments(id, x, y, z, comment)
        node.createComments()
        node.appendComments()
        node.set_CurrentURL()
        this.db.Save_PIN(id, String(relative_x), String(relative_y), comment)
    }

    /*
    サーバーから情報を読み込む
    読み込んだ内容を１つずつ取り出してCreate_PIN()にいれる。
    */
    loadComment(){
        let createComments = this.createComments.bind(this)
        let changefromreltoabs = this.Change_from_rel_to_abs.bind(this)
        this.db.Load_Comment()
        .then(function(e: Array<any>) {
            e.forEach(e => {
                let [absolute_x, absolute_y] = changefromreltoabs(Number(e.x), Number(e.y));
                console.log("DEBUG: absolute_x = "+absolute_x + ", absolute_y = " + absolute_y)
                createComments(e.id, String(absolute_x), String(absolute_y), "1000", e.comment, e.url)
            });
        });
    }

    close_all_Comment(){
        this.all_node.forEach(n => {
            n.close_comment()
        });
    }

    close_all_pin(){
        var flag = true;
        const target_node = document.getElementsByClassName("latest_button--four")
        this.all_node.forEach(n => {
            if ($('#'+n.pin_node.node.id).is(":hidden")){
                flag = false;
            }
        });
        this.all_node.forEach(n => {
            if (flag){
                if($("#"+n.pin_node.id).is(":visible")){
                    $("#"+n.pin_node.id).hide()
                }
                $(target_node).toggleClass("latest_button--six")
            }else{
                if($("#"+n.pin_node.id).is(":hidden")){
                    $("#"+n.pin_node.id).show()
                }
                $(target_node).toggleClass("latest_button--six")
            }
        });
    }

    Change_from_abs_to_rel(abs_x: number, abs_y: number): [number, number]{
        let rel_x = abs_x / document.body.clientWidth;
        let rel_y = abs_y / document.body.clientHeight;
        return [rel_x, rel_y];
    }

    Change_from_rel_to_abs(rel_x: number, rel_y: number): [number, number]{
        let abs_x = rel_x * document.body.clientWidth;
        let abs_y = rel_y * document.body.clientHeight;
        return [abs_x, abs_y];
    }
}
