var fs = require('fs'),
    gm = require('gray-matter'),
    path = require('path'),
    marked = require('marked');

function byID(a,b) {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}


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
        title: "Gallery",
        url: "#gallery"
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

    page = gm.read(`./pages/${page}`);

    return {
      title: page.data.title,
      id: page.data.id,
      url: page.data.url,
      content: marked(page.content)
    }
  }).sort(byID)
};
