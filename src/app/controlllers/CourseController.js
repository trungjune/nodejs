const Course = require("../models/Course");

class CourseController {
  // [GET] / courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }

  // [GET] / courses/create
  create(req, res) {
    res.render("courses/create");
  }

  // [POST] / courses/store
  store(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCFi7QkMmas5OmYFtamrzLyGtEPAw`;
    const courses = new Course(req.body);
    courses
      .save()
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  // [GET] /courses/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }

  // [PUT] / courses/:id
  update(req, res, next) {
    const courseId = req.params.id;
    const updateData = req.body;
    Course.updateOne({ _id: courseId }, updateData)
      .lean()
      .then((course) => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  // [DELETE] / courses/:id
  destroy(req, res, next) {
    const courseId = req.params.id;
    Course.delete({ _id: courseId })
      .lean()
      .then((course) => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [DELETE] / courses/:id/force
  forceDestroy(req, res, next) {
    const courseId = req.params.id;
    Course.deleteOne({ _id: courseId })
      .lean()
      .then((course) => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [PATCH] / courses/:id
  restore(req, res, next) {
    const courseId = req.params.id;
    Course.restore({ _id: courseId })
      .lean()
      .then((course) => {
        res.redirect("back");
      })
      .catch(next);
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .lean()
          .then((course) => {
            res.redirect("back");
          })
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
}

module.exports = new CourseController();
