class Debug{

    constructor() {
    }

    private make_random_comment(): string{
        let comments = ["ようこそLatestへ!!", "これ、楽しそう!", "これならどうかな?", "こんなのできたんだね!"]
        let min = Math.ceil(0);
        let max = Math.floor(comments.length);
        let num = Math.floor(Math.random() * (max - min)) + min;      
        return comments[num]
    }

    get_random_comment(): string{
        let comment = this.make_random_comment()
        return comment
    }
}