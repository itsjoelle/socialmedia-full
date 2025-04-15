import feed1 from '../../assets/feed1.png';
import feed2 from '../../assets/feed2.jpeg';
import feed3 from '../../assets/feed3.jpeg';
import feed4 from '../../assets/feed4.jpeg';
import feed5 from '../../assets/feed5.jpeg';
import person1 from '../../assets/person1.jpeg';
import person2 from '../../assets/person2.jpeg';
import person3 from '../../assets/person3.jpeg';

// static data for testing purposes
export const homeData = [
  {
    id: 0,
    image: feed4,
    profileImage: person3,
    name: 'Troy Wilson',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a.',
    posted: '3 minutes ago',
    likes: 11,
    like: false,
    comments: [],
  },
  {
    id: 1,
    image: feed2,
    profileImage: person1,
    name: 'Bruce Morgan',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a.',
    posted: '54 minutes ago',
    likes: 24,
    like: false,
    comments: [],
  },
  {
    id: 2,
    image: feed3,
    profileImage: person2,
    noPic: true,
    name: 'Brenda Hayes',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a. ',
    posted: '2 hours ago',
    likes: 3,
    like: false,
    comments: [],
    commentOpen: false,
  },
  {
    id: 3,
    image: feed3,
    profileImage: person2,
    name: 'Brenda Hayes',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a. ',
    posted: '4 hours ago',
    likes: 287,
    like: false,
    comments: [],
    commentOpen: false,
  },

  {
    id: 4,
    image: feed1,
    profileImage: feed1,
    name: 'Theo Hill',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a.',
    posted: '8 hours ago',
    likes: 32,
    like: false,
    comments: [],
    commentOpen: false,
  },
  {
    id: 5,
    image: feed5,
    profileImage: feed5,
    name: 'Shirley Saul',
    postCopy:
      ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim dolor, aperiam maiores, quasi dolores delectus beatae temporibus  praesentium reprehenderit autem, iusto consequatur neque debitis odio provident tempora a.',
    posted: '1 day ago',
    likes: 14,
    like: false,
    comments: [],
    commentOpen: false,
  },
];
