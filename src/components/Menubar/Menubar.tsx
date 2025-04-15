import './Menubar.scss';
import {
  menubarEntertainment,
  menubarGeneral,
  menubarOther,
} from '../../data/menubardata';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../customHooks/useAppContext';

const Menubar = () => {
  const { isLight } = useAppContext();
  const navigate = useNavigate();

  const handleMenuClick = (value: string) => {
    const navigateValue = value.replace(/\s+/g, '');
    navigate(`${navigateValue.toLowerCase()}`);
  };

  return (
    <div className={`menubar ${!isLight && 'dark'}`}>
      <div className="outerContainer">
        <div className="headline container">
          <div className={`headline ${!isLight && 'dark'}`}>General</div>
          <div className={`transparent is-menubar ${!isLight && 'dark'}`}></div>
        </div>
        <div className="innerContainer">
          {menubarGeneral.map((item) => {
            return (
              <div
                className="category"
                key={item.copy}
                onClick={() => handleMenuClick(item.copy)}
              >
                <div>
                  <img width={25} height={25} loading="lazy" src={item.image} />
                  {/* <LazyLoadImage
                    src={item.image}
                    width={25}
                    height={25}
                    alt="Image Alt"
                  /> */}
                </div>
                <span>{item.copy}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="outerContainer">
        <div className="headline container">
          <div className={`headline ${!isLight && 'dark'}`}>Entertainment</div>
          <div className={`transparent is-menubar ${!isLight && 'dark'}`}></div>
        </div>
        <div className="innerContainer">
          {menubarEntertainment.map((item) => {
            return (
              <div
                className="category"
                key={item.copy}
                onClick={() => handleMenuClick(item.copy)}
              >
                <div>
                  <img width={25} height={25} loading="lazy" src={item.image} />
                </div>
                <span>{item.copy}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="outerContainer">
        <div className="headline container">
          <div className={`headline ${!isLight && 'dark'}`}>Other</div>
          <div className={`transparent is-menubar ${!isLight && 'dark'}`}></div>
        </div>
        <div className="innerContainer">
          {menubarOther.map((item) => {
            return (
              <div
                className="category"
                key={item.copy}
                onClick={() => handleMenuClick(item.copy)}
              >
                <div>
                  <img width={25} height={25} loading="lazy" src={item.image} />
                </div>
                <span>{item.copy}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menubar;
