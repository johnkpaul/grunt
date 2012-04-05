var grunt = require('../../lib/grunt');
var log = grunt.log;
var growled_msg;
var old_growl;

exports['log'] = {
  'if growl option enabled, growl is called when log is written': function(test) {
    test.expect(1);
    growled_msg = "";
    grunt.option("growl",true);
    overwriteGrowl();
    log.write("test");
    test.equal("test",growled_msg);
    test.done();
    revertGrowl();
  },
  'if growl option is not enabled, growl is not used': function(test) {
    test.expect(1);
    growled_msg = "";
    grunt.option("growl",false);
    overwriteGrowl();
    log.write("test");
    test.notEqual("test",growled_msg);
    test.done();
  }
};

function overwriteGrowl(){
    old_growl = log.growl;
    var new_growl = function(msg){
        growled_msg = msg;
    }; 
    log.growl = new_growl;
}
function revertGrowl(){
    log.growl = old_growl;
}
