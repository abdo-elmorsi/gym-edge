import { PhotoProvider, PhotoView } from "react-photo-view";
// image view
import "react-photo-view/dist/react-photo-view.css";

// ----------------------------------------------------------------------

export default function ImageBox({ src, children, ...other }) {
    return (
        <>
            <PhotoProvider>
                <PhotoView src={`http://localhost:3001/img/${src}`}>
                    <div style={{ cursor: "pointer" }}>{children}</div>
                </PhotoView>
            </PhotoProvider>
        </>
    );
}
