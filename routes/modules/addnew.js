const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  //  回傳資料
  // 檢查是否有缺少資料，是的話則跳出錯誤

  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
