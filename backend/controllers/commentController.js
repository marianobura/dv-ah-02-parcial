const Comment = require("../models/commentsModels");
const User = require("../models/usersModels");

const createComment = async (req, res) => {
    const { body, likes, userId, postId } = req.body;

    if (!body || !userId || !postId) {
        res.status(400).json({ msg: "Faltan paramátros obligatorios", data: { body, userId } });
    }

    try {
        const user = await User.findById(userId);

        const newComment = new Comment({ body, likes, user: user._id, post: postId });
        await newComment.save();
        res.status(200).json({ msg: "Comentario creado", data: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

const getComments = async (req, res) => {
    const comments = await Comment.find().populate("user");
    res.status(200).json({ msg: "Ok", data: comments });
};

const getCommentsByPostId = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comment.find({ post: id }).populate("user");
        if (comments.length > 0) {
            res.status(200).json({ msg: "success", data: comments });
        } else {
            res.status(404).json({ msg: "No se encontró ningún comentario para ese post ", data: {} });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
}

const getCommentsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const comments = await Comment.find({ user: userId }).populate('user');
        if (comments.length > 0) {
            res.status(200).json({ msg: "success", data: comments });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (comment) {
            res.status(200).json({ msg: "success", data: comment });
        } else {
            res.status(404).json({ msg: "No se encontró el usuario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};
const updateCommentById = async (req, res) => {
    const { id } = req.params;
    const { body, likes } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { body, likes }, { new: true });
        if (comment) {
            res.status(200).json({ msg: "success", data: comment });
        } else {
            res.status(404).json({ msg: "No se encontro el comentario ", data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", data: {} });
    }
};

module.exports = { createComment, getComments, getCommentsByPostId, getCommentsByUserId, deleteCommentById, updateCommentById };