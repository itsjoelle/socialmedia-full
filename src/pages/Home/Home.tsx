import './Home.scss';
import Share from '../../components/Share/Share';
import Posts from '../../components/Posts/Posts';

const Home = () => {
  return (
    <div className="home">
      <div className="container"></div>
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
