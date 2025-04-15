import React, { useEffect, useState } from 'react';
import './Groups.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { doc, onSnapshot, collection, deleteDoc } from 'firebase/firestore';
import { ImExit } from 'react-icons/im';
import { useAppContext } from '../../customHooks/useAppContext';

export interface Group {
  copy: string;
  image: string;
  id: string;
}

const Groups = () => {
  const { isLight } = useAppContext();
  const [user] = useAuthState(auth);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (user) {
      const getGroups = onSnapshot(
        collection(db, 'users', user.uid, 'groups'),
        (snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Group[];
          setGroups(newData);
        }
      );

      return () => getGroups();
    }
  }, [user]);

  const leaveGroup = async (group: Group) => {
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'groups', group.id));
    }
  };
  return (
    <div className="groups">
      <div className="container">
        <h1 className={`${!isLight && 'dark'}`}>
          {groups.length > 0 ? 'Your Groups' : 'No groups joined yet'}{' '}
        </h1>
        <div className="sectionOuterContainer">
          {groups?.map((group, index: number) => {
            return (
              <div
                key={`${group}_${index}`}
                className={`sectionContainer ${!isLight && 'dark'}`}
              >
                <div>
                  <img className="icon" src={group.image} alt="icon" />
                </div>
                <div className={`groupContent ${!isLight && 'dark'}`}>
                  <div>{group.copy}</div>
                  <div onClick={() => leaveGroup(group)} className="leaveGroup">
                    <div className={`leaveGroup-text ${!isLight && 'dark'}`}>
                      Leave group
                    </div>
                    <div className="leaveGroup-icon">
                      <ImExit
                        fontSize={14}
                        color={`${
                          !isLight ? '#d3d3d3' : 'rgb(160 21 62 / 79%'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Groups;
