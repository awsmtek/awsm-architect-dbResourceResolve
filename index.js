'use_strict'

var DbResourceResolveService= require('./lib/DbResourceResolveService')



/**
 * awsm-architect-dbResourceResolve
 */
module.exports= function setup(options, imports, register) {

    console.assert(options.config, "Option 'config' is required")



    var $config= imports.$config

    var cfg= $config.create(options.config)



    var $dbResourceResolve= new DbResourceResolveService(cfg)



    register(null, {
        $dbResourceResolve: $dbResourceResolve,
    })

}
