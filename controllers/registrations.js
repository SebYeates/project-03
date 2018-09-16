const Article = require('../models/user');



// function indexRoute(req, res) {
//   Article.find().sort({title: 1 }).exec((err, articles) => {
//     res.render('articles/index', { articles });
//   });
// }


// function showRoute(req, res) {
//   Article.findById(req.params.id)
//     .exec((err, article) => {
//       res.render('articles/show', { article });
//     });
// }

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  Article.create(req.body, () => {
    res.redirect('/articles');
  });
}

// function editRoute(req, res) {
//   Article.findById(req.params.id, (err, article) => {
//     res.render('articles/edit', { article });
//   });
// }

// function updateRoute(req, res) {
//   Article.findById(req.params.id, (err, article) => {
//     article.set(req.body);
//     article.save(() => {
//       res.redirect(`/articles/${req.params.id}`);
//     });
//
//   });
// }

// function deleteRoute(req, res) {
//   Article.findById(req.params.id, (err, article) => {
//     article.remove(() => {
//       res.redirect('/articles');
//     });
//
//   });
// }

module.exports = {
  // index: indexRoute,
  // show: showRoute,
  new: newRoute,
  create: createRoute
  // edit: editRoute,
  // update: updateRoute,
  // delete: deleteRoute
};
