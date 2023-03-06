class APIfeatures{
    constructor(query, queryStr){
        this.query= query
        this.queryStr= queryStr
    }

    filter(){
        const queryObj= {...this.queryStr}
        const excludeFields= ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el => delete queryObj[el])

        // console.log(req.query, queryObj)
        let queryStr= JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match=> `$${match}`)
      
        this.query=  this.query.find(JSON.parse(queryStr))
        return this
    }

    sort(){
        if(this.queryStr.sort){
            const sortedBy= this.queryStr.sort.split(',').join(" ")
            this.query= this.query.sort(sortedBy)
        }else{
            this.query= this.query.sort('-createdAt')
        }
        return this
    }
    
    limit(){
        if(this.queryStr.fields){
            const fields= this.queryStr.fields.split(",").join(" ")
            this.query= this.query.select(fields)
        }else{
            this.query= this.query.select('-__v')
        }
        return this
    }

    paginate(){
        const limit= parseInt(this.queryStr.limit) || 100
        const skip= (parseInt(this.queryStr.page)-1) * limit || 0
        this.query= this.query.skip(skip).limit(limit).sort("_id")

        return this

    }
}

module.exports= APIfeatures