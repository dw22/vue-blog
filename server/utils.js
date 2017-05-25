/**
 * Created by wanrenya on 2017/2/13.
 */
const downsize = require('downsize');
module.exports = {
  htmlToWord :function(html, options){
    options = options || {};
    // Strip other html
    var excerpt = html.replace(/<\/?[^>]+>/gi, '');
    excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');

    if (!options.words && !options.characters) {
      options.words = 50;
    }

    return downsize(excerpt, options);
  }
}
