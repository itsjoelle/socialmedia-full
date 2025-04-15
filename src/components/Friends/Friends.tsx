import './Friends.scss';
import { friendsData } from '../../data/friendsData';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { useAppContext } from '../../customHooks/useAppContext';
import { Friend } from '../../interfaces_types/types';

const Friends = () => {
  const { isLight } = useAppContext();

  return (
    <div className="friends">
      <div className="container">
        <h1 className={`${!isLight && 'dark'}`}>Friends</h1>

        <div className="sectionOuterContainer">
          {friendsData.map((friend: Friend) => {
            return (
              <div
                key={friend.name}
                className={`sectionContainer ${!isLight && 'dark'}`}
              >
                <div>
                  <img className="icon" src={friend.image} alt="icon" />
                </div>
                <div className={`userContent ${!isLight && 'dark'}`}>
                  <div> {friend.name}</div>
                  <div className={`friendsAmount ${!isLight && 'dark'}`}>
                    {friend.friends} friends
                  </div>
                </div>
                <div className="friendsIcon">
                  <LiaUserFriendsSolid
                    fontSize={24}
                    color={`${!isLight ? '#d3d3d3' : 'rgb(160 21 62 / 79%'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Friends;
