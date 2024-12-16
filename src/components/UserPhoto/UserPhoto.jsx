import { useDispatch, useSelector } from "react-redux";
import { editUserAvatarThunk } from "../../redux/user/operations.js";
import { selectUser } from "../../redux/user/selectors.js";
import sprite from "../../icons/sprite.svg";
import css from "./UserPhoto.module.css";

export default function UserPhoto() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    document.getElementById("photoInput").click();
  };

  const handleUploadPhoto = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      dispatch(editUserAvatarThunk(imageURL));
    }
  };
  return (
    <>
      <h3 className={css.subtitle} style={{ marginBottom: "8px" }}>
        Your photo
      </h3>
      <div className={css.photoSetting}>
        {user?.photo ? (
          <div className={css.photoWrap}>
            <img className={css.photo} src={user.photo} alt="User photo" />
          </div>
        ) : (
          <svg width={80} height={80} className={css.defaultUser}>
            <use href={`${sprite}#icon-user`} />
          </svg>
        )}
        <div>
          <button type="button" className={css.uploadBtn} onClick={handleClick}>
            <svg width={16} height={16} className={css.uploadIcon}>
              <use href={`${sprite}#icon-upload`} />
            </svg>
            Upload a photo
          </button>
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUploadPhoto}
          />
        </div>
      </div>
    </>
  );
}
