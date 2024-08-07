import React, { useEffect, useRef, useState } from 'react';
import dropDownCaretIcon from '../../../resources/assets/caret-down-icon.png';
import './DropDown.scss';

export function DropDown(props: {
  userNameList: any[];
  // eslint-disable-next-line no-unused-vars
  updateUserShareName: (username: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const dropDownRef = useRef<HTMLDivElement>(null);
  const dropDownZIndexOnOpen = '4';
  const dropDownZIndexOnClose = '3';
  const { userNameList, updateUserShareName } = props;

  const changeDropDownZIndex = (ZIndexValue: string) => {
    if (dropDownRef.current) {
      dropDownRef.current.style.zIndex = ZIndexValue;
    }
  };

  const dropDownClicked = () => {
    setOpen(!open);
    changeDropDownZIndex(dropDownZIndexOnOpen);
  };

  const handleOptionClick = (username: string) => {
    setOpen(false);
    setCurrentOption(username);
    updateUserShareName(username);
  };

  const updateCurrentOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(event.target.value);
    updateUserShareName(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        dropDownRef !== null
        && dropDownRef.current
        && !dropDownRef.current.contains(event.target)
      ) {
        setOpen(false);
        changeDropDownZIndex(dropDownZIndexOnClose);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div className="dropdown" ref={dropDownRef}>
      <div
        className="dropdown-text"
        role="presentation"
        onClick={dropDownClicked}
        onKeyDown={dropDownClicked}
      >
        <input
          id="search-input"
          className="search-input"
          value={currentOption}
          onChange={(event) => updateCurrentOption(event)}
        />
        <span className="dropdown-caret">
          <img
            src={dropDownCaretIcon}
            alt="dropdown-caret"
            width="8px"
            height="8px"
          />
        </span>
      </div>
      {open && (
        <div id="option-view" className="option-view">
          {userNameList.map((user) => (
            <div
              id="option"
              role="presentation"
              onClick={() => handleOptionClick(user.username)}
              onKeyDown={() => handleOptionClick(user.username)}
              className="option"
            >
              {user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default DropDown;
