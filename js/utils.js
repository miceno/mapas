function insertRandomCSS( file){
    insertCSS( file + '?a='+Math.random());
}

function insertCSS( file){
    document.write('<lin' + 'k rel="stylesheet" type="text/css" href="' + file +'">');
}
function insertScript( file){
    var id= '';
    if( arguments.length> 1){
        id= ' id="' + arguments[ 1] + '"';
    }
    document.write('<scr'+'ipt type="text/javascript" ' + id + ' src="'+ file + '"></scr'+'ipt>');
}
function insertRandomScript( file){
    insertScript( file + '?a='+Math.random());
}
