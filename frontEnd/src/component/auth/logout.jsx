import { useNavigate } from "react-router-dom";
export default function LogOut() {
    const navigate = useNavigate();
    const cookie = document.cookie;
    cookie.remove();
    navigate("/");
}