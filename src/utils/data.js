export const categories = [
  {
    name: 'dogs',
    image:
      'https://as2.ftcdn.net/v2/jpg/02/96/92/85/1000_F_296928535_39DVNoqSdEqknJyQp5yeWpf064JgHPNB.jpg',
  },

  {
    name: 'food',
    image:
      'https://img.freepik.com/free-vector/ramen-noodle-egg-meat-with-chopstick-cartoon_138676-2543.jpg?w=1480&t=st=1667014567~exp=1667015167~hmac=850f01fe7be8d0941cef770517f2d245bb75f5ec3b860f075797f70ca446ad77',
  },

  // {
  //   name: 'others',
  //   image:
  //     'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  // },
];

export const feedQuery = `*[_type == "post"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const PostDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const PostDetailMorePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
