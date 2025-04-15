import './Profile.scss';
import banner3 from '../../assets/bannerbeach.png';
import { IoPersonAddOutline } from 'react-icons/io5';
import { TbMessageCirclePlus } from 'react-icons/tb';
import { IoLocationOutline } from 'react-icons/io5';
import Posts from '../../components/Posts/Posts';
import phicon from '../../assets/placeholderIcon.jpeg';

interface ProfileUser {
  image: string;
  name: string;
}
const Profile = () => {
  const currentUser: ProfileUser = JSON.parse(
    localStorage.getItem('profileUser') as string
  );

  return (
    <div className="profile">
      <div className="container">
        <div className="banner">
          <img width="100%" className="banner-image" src={banner3} />
          <div className="banner-content">
            <div>
              <img
                loading="lazy"
                src={currentUser.image ? currentUser.image : phicon}
              />
            </div>
            <div className="flex-container">
              <div className="user-profile">
                <div className="user-profile-name">
                  {currentUser.name ? currentUser.name : null}
                </div>
                <div className="location">
                  <span>
                    <IoLocationOutline fontSize="small" />
                  </span>
                  City
                </div>
              </div>
              <div className="contact">
                <div>
                  <button className="follow">+ Follow</button>{' '}
                  <div className="follow-small">
                    <IoPersonAddOutline fontSize={19} />
                  </div>
                </div>
                <button className="follow">Message</button>{' '}
                <div className="follow-small">
                  <TbMessageCirclePlus fontSize={19} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Profile;
