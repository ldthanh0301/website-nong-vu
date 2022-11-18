const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewave/auth')

const Category = require('../models/Category')



// @route GET api/categories
// @desc GET category
// @access private

router.get('/', verifyToken, async(req, res) => {
    try {
        const categories = await Category.find()

        res.json({ success: true, categories })
    } catch (error) {

    }
})

// @route POST api/categories
// @desc Create category
// @access private

router.post('/', verifyToken, async(req, res) => {
    const {
        name
    } = req.body
        //simple validation
    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        })
    try {
        const newCategory = new Category({
            name
        })
        await newCategory.save()
        res.json({
            success: true,
            message: 'Thêm danh mục thành công',
            category: newCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// @route PUT api/posts
// @desc Update post
// @access private

router.put('/:id', verifyToken, async(req, res) => {
        const {
            name,
        } = req.body
            //simple validation
        if (!name)
            return res.status(400).json({
                success: false,
                message: 'name is required'
            })

        try {
            const categoryUpdateCondition = { _id: req.params.id}

            updatedCategory = await Category.findOneAndUpdate(
                categoryUpdateCondition,
                {name}, { new: true }
            )

            // User not authorised to update post or post not found
            if (!updatedCategory)
                return res.status(401).json({
                    success: false,
                    message: 'Cập nhật thất bại'
                })

            res.json({
                success: true,
                message: 'Cập nhật thành công',
                category: updatedCategory
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    })
    // @route DELETE api/categories
    // @desc Delete category
    // @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const categoryDeleteCondition = { _id: req.params.id}
        const deletedCategory= await Category.findOneAndDelete(categoryDeleteCondition)

        // User not authorised or post not found
        if (!deletedCategory)
            return res.status(401).json({
                success: false,
                message: 'Thiếu quyền hoặc không tồn tại'
            })

        res.json({ success: true, category: deletedCategory })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router