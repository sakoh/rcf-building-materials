var fs = require('fs'),
    gm = require('gray-matter')
    marked = require('marked');

module.exports = {
  site: {
    name: "Rent A Tool",
    navigation: [
      {
        title: "About",
        url: "#about"
      },
      {
        title: "Download",
        url: "#download"
      },
      {
        title: "Contact",
        url: "#contact"
      },
      {
        title: "Location",
        url: "#map"
      }
    ]
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
