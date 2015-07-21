'use_strict'

module.exports= DbResourceResolveService



/**
 * DbResourceResolveService
 *
 * @constructor
 * @return {DbResourceResolveService}
 */
function DbResourceResolveService(config) {

    this.config= config

}



DbResourceResolveService.prototype.resolve= function * (items, resolve) {
    if (items && items.length) {
        for (var k in resolve) if (resolve.hasOwnProperty(k)) {
            var resolveFn= resolveHandler(resolve[k].id, resolve[k].handler)
            yield resolveFn(items, k)
        }
    }
}

function resolveHandler(idKey, handler) {
    return function * (items, key) {
        var idx= {}
        for (var i= 0, l= items.length; i < l; i++) {
            var item= items[i]
            if (item) {
                var id= items[i][idKey]
                if (id) {
                    idx[id]= true
                }
            }
        }
        var ids= Object.keys(idx)
        if (ids.length) {
            var result= yield handler(ids)
            for (var i= 0, l= result.length; i < l; i++) {
                var id= result[i].id
                if (id) {
                    idx[id]= result[i]
                }
            }
            for (var i= 0, l= items.length; i < l; i++) {
                var id= items[i][idKey]
                items[i][key]= idx[id]
            }
        } else {
            for (var i= 0, l= items.length; i < l; i++) {
                var item= items[i]
                if (item) {
                    items[i][key]= null
                }
            }
        }
    }
}

function resolveCollectionHandler(handler) {
    return function * (items, key) {
        var idx= {}
        for (var i= 0, l= items.length; i < l; i++) {
            var id= items[i].id
            if (id) {
                idx[id]= true
            }
        }
        var ids= Object.keys(idx)
        if (ids.length) {
            var result= yield handler(ids)
            //for (var i= 0, l= result.length; i < l; i++) {
            //    var id= result[i].id
            //    if (id) {
            //        idx[id]= result[i]
            //    }
            //}
            //for (var i= 0, l= items.length; i < l; i++) {
            //    var id= items[i][idKey]
            //    items[i][key]= idx[id]
            //}
        } else {
            //for (var i= 0, l= items.length; i < l; i++) {
            //    items[i][key]= null
            //}
        }
    }
}
