import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_comments, post_comment, reply_to_comment } from "../store/reducers/commentReducer";

const Comments = () => {
    const [newComment, setNewComment] = useState({ name: "", email: "", text: "" });
    const [newReply, setNewReply] = useState({ text: "", name: "", email: "" });
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [expandedComment, setExpandedComment] = useState(null);

    const { comments, loading, error } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch_comments());
    }, [dispatch]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const { name, email, text } = newComment;
        if (name && email && text) {
            await dispatch(post_comment({ name, email, content: text }));
            setNewComment({ name: "", email: "", text: "" });
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const { name, email, text } = newReply;
        if (name && email && text) {
            await dispatch(reply_to_comment({ commentId: replyTo, reply: { name, email, content: text } }));
            setNewReply({ text: "", name: "", email: "" });
            setShowReplyForm(false);
            setReplyTo(null);
        }
    };


    const handleToggleReplies = (commentId) => {
        setExpandedComment((prev) => (prev === commentId ? null : commentId));
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Add a Comment Form */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Share your opinion about our website.</h2>
                <p className="mb-2">Your Email Address will not be published anywhere in our platform!</p>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Opinion"
                        value={newComment.text}
                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                        required
                    ></textarea>
                    <div className="grid md:grid-cols-1 grid-cols-3 gap-4 mt-4">
                        <input
                            type="text"
                            className="p-3 border border-gray-300 rounded-lg"
                            placeholder="Single Name*"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            className="p-3 border border-gray-300 rounded-lg"
                            placeholder="Email*"
                            value={newComment.email}
                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 mt-4"
                    >
                        Post Opinion
                    </button>
                </form>
            </div>

            {/* Comments Section */}
            <div className="bg-white shadow-md rounded-lg p-6 max-h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Opinions ({comments.length})</h2>
                {comments.map((comment) => (
                    <div key={comment._id} className="mb-6 border-b bg-green-300 p-4 rounded-md pb-6">
                        <div className="mb-2 flex flex-row items-center gap-4">
                            <h3 className="font-bold">{comment.name}</h3>
                            <p className="text-sm text-gray-500">({comment.email})</p>
                        </div>
                        <p className="text-gray-700 mb-3"><span className="font-bold text-black">Posted on:</span> {formatDate(comment.createdAt)}</p>
                        <p className="text-gray-700 font-bold bg-gray-200 p-2 rounded-md">{comment.content}</p>
                        <div className="flex flex-row items-center gap-4">
                            <button
                                onClick={() => {
                                    setReplyTo(comment._id);
                                    setShowReplyForm(true);
                                }}
                                className="text-purple-500 text-sm font-semibold mt-2 hover:underline"
                            >
                                Reply
                            </button>
                            <button
                                onClick={() => handleToggleReplies(comment._id)}
                                className="text-purple-500 text-sm font-semibold mt-2 hover:underline"
                            >
                                {expandedComment === comment._id
                                    ? `Hide Replies (${comment.replies?.length || 0})`
                                    : `View Replies (${comment.replies?.length || 0})`}
                            </button>
                        </div>
                        <div
                            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${expandedComment === comment._id ? "max-h-screen" : "max-h-0"
                                }`}
                        >
                            {comment.replies?.map((reply) => (
                                <div key={reply._id} className="ml-9 mt-4 border-b border-gray-200">
                                    <div className="mb-2 flex flex-row items-center gap-4">
                                        <h3 className="font-bold">{reply.name}</h3>
                                        <p className="text-sm text-gray-500">({reply.email})</p>
                                    </div>
                                    <p className="text-gray-700 mb-3"><span className="font-bold text-black">Replied on:</span> {formatDate(reply.createdAt)}</p>
                                    <p className="text-gray-100 bg-gray-400 p-2 font-bold rounded-md">{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Reply Form */}
                {showReplyForm && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[80%]">
                            <h2 className="text-lg font-bold mb-4">
                                Reply to {comments.find((comment) => comment._id === replyTo)?.name}
                            </h2>
                            <form onSubmit={handleReplySubmit}>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    rows="4"
                                    placeholder="Reply"
                                    value={newReply.text}
                                    onChange={(e) => setNewReply({ ...newReply, text: e.target.value })}
                                    required
                                ></textarea>
                                <div className="grid grid-cols-3 md:grid-cols-1 gap-4 mt-4">
                                    <input
                                        type="text"
                                        className="p-3 border border-gray-300 rounded-lg"
                                        placeholder="Single Name*"
                                        value={newReply.name}
                                        onChange={(e) => setNewReply({ ...newReply, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        className="p-3 border border-gray-300 rounded-lg"
                                        placeholder="Email*"
                                        value={newReply.email}
                                        onChange={(e) => setNewReply({ ...newReply, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowReplyForm(false);
                                            setReplyTo(null);
                                        }}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Post Reply
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;