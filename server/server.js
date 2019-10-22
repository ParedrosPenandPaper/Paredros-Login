'use strict'
/* eslint-disable */

const express = require('express')
const passport = require('passport')

const app = express()
app.use(express.static(__dirname))

// @fabi - TODO: implement athentication with passport here 

const port = 80;

app.listen(port, () => {
    console.log(Date() + ': paredros login server running on port ' + port)
})
