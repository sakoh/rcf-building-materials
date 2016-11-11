var fs = require('fs'),
    gm = require('gray-matter')
    marked = require('marked');

module.exports = {
  site: {
    name: "Rent A Tool"
  },
  pages: fs.readdirSync('./pages').map(page => {
    var page = gm.read(`./pages/${page}`);
    return {
      title: page.data.title,
      id: page.data.id,
      content: marked(page.content)
    }
  })
}
