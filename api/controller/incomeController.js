const Income= require('./../models/incomeModel')

exports.createIncome= async(req, res)=>{
    try{
        const income= await Income.create(req.body)

        res.status(201).json({
            status: 'success',
            income
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getAll= async(req, res)=>{
    try{
        const incomes= await Income.find()

        res.status(200).json({
            status: 'success',
            length: incomes.length,
            incomes
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getOne= async(req, res)=>{
    try{
        const income= await Income.findById(req.params.id)

        
        res.status(200).json({
            status: 'success',
            income
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}