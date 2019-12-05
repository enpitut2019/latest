class ManageID{

    private maxnum: number
    private minnum: number

    constructor() {
        this.maxnum = 100000
        this.minnum = 1
    }

    get_Random_id(): string{
        let id = this.make_random_id()
        return id
    }

    private getRandomInt(min: number, max: number) :number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    private make_random_id() :string{
        let id = String(this.getRandomInt(this.minnum, this.maxnum))
        return "Comment" + id
    }
}
