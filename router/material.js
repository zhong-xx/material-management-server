const express = require('express');
const router = express.Router();

const Material = require('../model/Material.js');

router.post('/addMaterial', (req, res) => {
    let date = new Date();
    let time = date.getFullYear().toString()+"-"+ (date.getMonth() + 1).toString()+"-"+ date.getDate().toString();
    Material.create({
        name: req.body.name,
        item_type: req.body.itemType,
        unit: req.body.unit,
        model: req.body.model,
        is_effective: req.body.isEffective,
        reserve_type: req.body.reserveType,
        sort: req.body.sort,
        weight: req.body.weight,
        volume: req.body.volume,
        purpose: req.body.purpose,
        time: time,
    })
    .then(()=> {
        res.json({
            code: '0000',
            msg: '物资新增成功'
        })
    })
})

router.get('/getMaterialsMessage', (req, res)=> {
    Material.find({ item_type: req.query.itemType})
            .skip((req.query.page-1)*req.query.size)
            .limit(parseInt(req.query.size))
            .select('name model reserve_type is_effective sort')
            .then(data=> {
                if(data.length === 0 && req.query.page > 1) {
                    Material.find({ item_type: req.query.itemType})
                    .skip((req.query.page-2)*req.query.size)
                    .limit(parseInt(req.query.size))
                    .select('name model reserve_type is_effective sort')
                    .then(data=> {
                        Material.count({ item_type: req.query.itemType})
                        .then(count=> {
                            return res.json({
                                code: '0000',
                                msg: '获取物资信息成功',
                                data: {
                                    count,
                                    data,
                                    reduce: true
                                }
                            })
                        })
                    })
                }else {
                    Material.count({ item_type: req.query.itemType})
                        .then(count=> {
                            return res.json({
                                code: '0000',
                                msg: '获取物资信息成功',
                                data: {
                                    count,
                                    data
                                }
                            })
                        })
                }
                
            })
})

router.get('/getMaterialMessage', (req, res)=> {
    Material.findOne({ _id: req.query.id})
            .then(data=> {
                res.json({
                    code: '0000',
                    msg: '获取某物资信息成功',
                    data
                })
            })
})

router.post('/updateMaterialMessage', (req, res)=> {
    Material.updateOne({_id: req.body.id}, {
        name: req.body.name,
        item_type: req.body.itemType,
        unit: req.body.unit,
        model: req.body.model,
        is_effective: req.body.isEffective,
        reserve_type: req.body.reserveType,
        sort: req.body.sort,
        weight: req.body.weight,
        volume: req.body.volume,
        purpose: req.body.purpose,
        time: req.body.time
    })
    .then(()=> {
        res.json({
            code: '0000',
            msg: '编辑物资信息成功'
        })
    })
})

router.post('/deleteMaterial', (req, res)=> {
    let data = [];
    for(let item of req.body.messageList) {
        let response = Material.findOneAndDelete({_id: item._id});
        data.push(response);
    }
    Promise.all(data)
            .then(values => {
                res.json({
                    code: '0000',
                    msg: '删除物资成功'
                })
            })
})

router.get('/selectMatrials', (req, res)=> {
    Material.find({
        item_type: req.query.itemType,
        model: req.query.model,
        is_effective: req.query.isEffective
    })
    .skip((req.query.page-1)*req.query.size)
    .limit(parseInt(req.query.size))
    .select('name model reserve_type is_effective sort')
    .then(data=> {
        if(data.length === 0 && req.query.page > 1) {
            Material.find({
                item_type: req.query.itemType,
                model: req.query.model,
                is_effective: req.query.isEffective
            })
            .skip((req.query.page-2)*req.query.size)
            .limit(parseInt(req.query.size))
            .select('name model reserve_type is_effective sort')
            .then(data=> {
                Material.count({
                    item_type: req.query.itemType,
                    model: req.query.model,
                    is_effective: req.query.isEffective
                })
                .then(count=> {
                    return res.json({
                        code: '0000',
                        msg: '获取物资信息成功',
                        data: {
                            count,
                            data,
                            reduce: true
                        }
                    })
                })
            })
        } else {
            Material.count({
                item_type: req.query.itemType,
                model: req.query.model,
                is_effective: req.query.isEffective
            })
            .then(count=> {
                return res.json({
                    code: '0000',
                    msg: '获取物资信息成功',
                    data: {
                        count,
                        data
                    }
                })
            })
        }
        
    })
})

module.exports = router;