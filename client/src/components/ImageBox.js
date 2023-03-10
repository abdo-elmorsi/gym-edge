import { MAvatar } from "./@material-extend";
import createAvatar from "../utils/createAvatar";
import { PhotoProvider, PhotoView } from "react-photo-view";
// image view
import "react-photo-view/dist/react-photo-view.css";

// ----------------------------------------------------------------------

export default function ImageBox({ src, user = "A", ...other }) {
    return (
        <>
            <PhotoProvider>
                <PhotoView src={`http://localhost:3001/img/users/${src}`}>
                    <MAvatar
                        style={{ cursor: "pointer" }}
                        src={`http://localhost:3001/img/users/${src}`}
                        alt={src}
                        color={src ? "default" : createAvatar(user).color}
                        {...other}
                    >
                        {createAvatar(user).name}
                    </MAvatar>
                </PhotoView>
            </PhotoProvider>
        </>
    );
}
