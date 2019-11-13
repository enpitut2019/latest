/**
 * クリックするとコメントを表示するためのトリガー(ピン)を作成する。
 * @param id ピンに付与するid名
 * @param x ピンのx座標
 * @param y ピンのy座標
 * @param z ピンのz座標(重なり順)
**/
function Make_Pin_Node(id: string, x: string, y: string, z: string): Node{
    // ノードの作成
    var new_node = document.createElement("div")
    // idの付与
    new_node.id = id+"_PIN"
    // 位置を付与(absolute)
    new_node.style.position = "absolute"
    new_node.style.left = x+"px"
    new_node.style.top = y+"px"
    // z位置(重なり順を決定)
    new_node.style.zIndex = z
    // 表示する言葉(将来的には画像)
    new_node.innerHTML = ""
    // ピンをクリックしたときの関数を追加
    new_node.onclick = function(){
        Display_Comment(id)
    }
    // 見た目の設定
    new_node.style.padding = "10px"
    new_node.style.marginBottom = "10px"
    new_node.style.border = "1px solid #333333"
    new_node.style.backgroundColor = "#ffff99"

    return new_node
}

/**
 * クリックした時に表示されるコメントを作成
 * @param id コメントに付与するid名
 * @param x コメントのx座標(基本的に0)
 * @param y コメントのy座標(基本的に0)
 * @param z コメントの重なり順
 * @param comment (コメント本文)
 */
function Make_Comment_Node(id: string, x: string, y: string, z: string, comment: string) :Node{
    // ノードの作成
    var new_node = document.createElement("div")
    // idの付与
    new_node.id = id
    // show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
    new_node.style.display = "none"
    // コメントの内容を付与
    new_node.innerHTML = comment
    // 初期の位置を付与(absolute)
    new_node.style.position = "absolute"
    new_node.style.left = x+"px"
    new_node.style.top = y+"px"
    // z位置(重なり順を決定)
    new_node.style.zIndex = String(Number(z)+1)
    // 見た目の設定
    new_node.style.padding = "10px"
    new_node.style.marginBottom = "10px"
    new_node.style.border = "1px solid #333333"
    new_node.style.backgroundColor = "#ffff99"

    return new_node
}

/**
 * コメントを表示させる関数
 * @param id 指定したコメントのid属性
 */
function Display_Comment(id: string){
    $("#"+id+"_PIN").on("click", function(e){
        if ($("#"+id).is(":hidden")){
            Move_Comment(e.pageX, e.pageY, id)    
        }
    });
}

/**
 * コメントとバツマークを指定した位置に表示させる。
 * @param mouse_x 指定したx座標
 * @param mouse_y 指定したy座標
 * @param target_id クリックしたPINに対応したコメントのid属性
 */
function Move_Comment(mouse_x: number, mouse_y: number, target_id: string) {
    // 対象のidのコメントとそのコメントのバツマークを表示状態に変更
    $("#"+target_id).show();
    $("#"+target_id+"_close").show();
    
    // 指定の位置にコメントを移動
    $("#"+target_id).css({
        "position": "absolute",
        "left": mouse_x,
        "top": mouse_y
    });

    // 指定の位置の右上にバツマークを移動
    let cls_btn_x = mouse_x
    let cls_btn_y = mouse_y - 5
    // コメントの幅を取得
    let target_width = $("#"+target_id).outerWidth(true)
    // コメントの幅が取得できればその分右にずらす
    if (target_width != undefined){
        cls_btn_x += target_width - 5
    }
    // バツマークを移動
    $("#"+target_id+"_close").css({
        "position": "absolute",
        "left": cls_btn_x,
        "top": cls_btn_y
    });
}

/**
 * コメントの右上に閉じるボタンを作成
 * @param id コメントに付与するid名
 * @param x コメントのx座標(基本的に0)
 * @param y コメントのy座標(基本的に0)
 * @param z コメントの重なり順 
 */
function Make_Close_Btn_Node(id: string, x: string, y: string, z: string) :Node{
    // コメントにバツボタンを付与
    var close_node = document.createElement("div")
    // バツボタンにidを付与
    close_node.id = id + "_close"
    // show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
    close_node.style.display = "none"
    // Xの文字を付与
    close_node.innerHTML = "X"
    // コメントの幅を取得
    let node_width = close_node.clientWidth;
    // バツのx座標をコメントの幅分増量
    let close_node_x = String(node_width + Number(x))
    // 初期の位置を付与(absolute)
    close_node.style.position = "absolute"
    close_node.style.left = close_node_x+"px"
    close_node.style.top = y+"px"
    // z位置(重なり順を決定)
    close_node.style.zIndex = String(Number(z)+2)
    // バツボタンをクリックしたときの関数を追加
    close_node.onclick = function(){
        Close_Comment(id)
    }

    return close_node
}

/**
 * 指定したコメントを非表示状態に変更
 * @param id 指定したコメントのid属性
 */
function Close_Comment(id: string) {
    if ($("#"+id).is(":visible")){
        $("#"+id).hide()
        $("#"+id+"_close").hide()
    }
}

/**
 * ピン・コメント(非表示)・閉じるボタン(非表示)をHTML内に追加
 * @param id コメントに与えるid属性
 * @param x ピンが立つx座標(最左が0)
 * @param y ピンが立つy座標(最上が0)
 */
function add_HTML(id: string, x: string, y:string){
    // 重なり位置を指定
    let z = "100"
    // ピンを作成
    var new_pin = Make_Pin_Node(id, x, y, z)
    // コメント(初期設定:非表示)を作成
    var new_comment = Make_Comment_Node(id, "0", "0", z, "コメント")
    // 閉じるボタン(初期設定:非表示)を作成
    var cls_btn = Make_Close_Btn_Node(id, "0", "0", z)

    //bodyに追加する。
    document.body.appendChild(new_pin)
    document.body.appendChild(new_comment)
    document.body.appendChild(cls_btn)
}

/**
 * サイトを読み込んだときに実行
*/
window.onload = function(){
    add_HTML("Comment1", "100", "100")
}