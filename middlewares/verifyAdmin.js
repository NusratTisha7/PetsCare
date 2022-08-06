module.exports=function(req,res,next){
    if(req.user.result.role!='admin')return res.status(403).send('you have no permission to access this route!')
    next()
}