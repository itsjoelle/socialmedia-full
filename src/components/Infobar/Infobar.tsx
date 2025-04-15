import { useEffect, useState } from 'react';
import './Infobar.scss';
import { infobarGroups, infobarUpdates } from '../../data/infobardata';
import { onSnapshot, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';
import { Group } from '../Groups/Groups';
import { useAppContext } from '../../customHooks/useAppContext';

const Infobar = () => {
  const { isLight } = useAppContext();
  const [user] = useAuthState(auth);
  const [groups, setGroups] = useState(infobarGroups);

  useEffect(() => {
    if (user) {
      const getGroups = onSnapshot(
        collection(db, 'users', user.uid, 'groups'),
        (snapshot) => {
          const joinedGroups: string[] = [];
          snapshot.docs.map((doc) => {
            joinedGroups.push(doc.data());
          });

          const result = groups.filter(
            (allGroups) =>
              !joinedGroups.some(
                (joinedGroup: Group) => joinedGroup.copy === allGroups.copy
              )
          );

          setGroups(result);
        }
      );

      return () => getGroups();
    }
  }, [user]);

  const joinGroup = async (group: Group) => {
    const metadata = {
      contentType: 'image/png',
    };

    const imgToBlob = group.image;
    const response = await fetch(imgToBlob);
    const imageBlob = await response.blob();

    if (user) {
      const ImageRef = ref(storage, `images/${group.copy + v4()}`);

      uploadBytes(ImageRef, imageBlob, metadata).then((data) => {
        getDownloadURL(data.ref).then((imgURL) => {
          addDoc(collection(db, 'users', user.uid, 'groups'), {
            copy: group.copy,
            image: imgURL,
          });
        });
      });
    }
  };

  return (
    <div className={`infobar ${!isLight && 'dark'}`}>
      <div>
        {groups.length > 0 ? (
          <div className={`section suggestions ${!isLight && 'dark'}`}>
            <div className="headline container">
              <div className={`headline ${!isLight && 'dark'}`}>
                Groups You May Join
              </div>
              <div className={`transparent ${!isLight && 'dark'}`}> </div>
            </div>

            <div className="outerContainer">
              {groups.map((item, i) => {
                return (
                  <div key={item.copy + i} className="container">
                    <div className="group">
                      <div>
                        <img
                          width="90"
                          height="60"
                          loading="lazy"
                          className="image"
                          src={item.image}
                        />
                      </div>
                      <div className="copy">{item.copy}</div>
                    </div>
                    <div>
                      <button
                        onClick={() => joinGroup(item)}
                        className={`button ${!isLight && 'dark'}`}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className={`section updates ${!isLight && 'dark'}`}>
          <div className="headline container">
            <div className={`headline ${!isLight && 'dark'}`}>
              Latest Updates
            </div>
            <div className={`transparent ${!isLight && 'dark'}`}> </div>
          </div>
          {infobarUpdates.map((item, i) => {
            return (
              <div key={item.image + i} className="container update">
                <div className="group update">
                  <div>
                    <img
                      loading="lazy"
                      className="image update"
                      src={item.image}
                    />
                  </div>
                  <div className="copy update">{item.copy}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Infobar;
