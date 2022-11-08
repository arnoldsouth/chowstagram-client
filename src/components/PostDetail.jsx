import React, { useEffect, useState } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { PostDetailMorePostQuery, PostDetailQuery } from "../utils/data";
import LoadingSpinner from "./LoadingSpinner";

const PostDetail = ({ user }) => {
  const { postId } = useParams();
  const [posts, setPosts] = useState();
  const [PostDetail, setPostDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const fetchPostDetails = () => {
    const query = PostDetailQuery(postId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = PostDetailMorePostQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!PostDetail) {
    return <LoadingSpinner message="Grabbing what you want..." />;
  }

  return (
    <>
      {PostDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={PostDetail?.image && urlFor(PostDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${PostDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-lg flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <IoDownloadOutline />
                </a>
              </div>

              <a
                href={PostDetail.destination}
                target="_blank"
                rel="noreferrer"
              >
                {PostDetail.destination?.slice(8, -25)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {PostDetail.title}
              </h1>
              <p className="mt-3">{PostDetail.about}</p>
            </div>
            <Link
              to={`/user-profile/${PostDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={PostDetail?.postedBy.image}
                className="w-10 h-10 rounded-lg"
                alt="user-profile"
              />
              <p className="font-bold">{PostDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {PostDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={item.comment}
                >
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-lg cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-lg focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-gray-900 text-white rounded-lg px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Doing..." : "Done"}
              </button>
            </div>
          </div>
        </div>
      )}
      {posts?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {posts ? (
        <MasonryLayout posts={posts} />
      ) : (
        <LoadingSpinner message="Loading more posts" />
      )}
    </>
  );
};

export default PostDetail;
