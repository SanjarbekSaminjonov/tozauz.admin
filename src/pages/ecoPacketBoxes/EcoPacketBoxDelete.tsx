import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackLink from "../../components/BackLink"
import { ecoPacketBoxesServices } from "../../services/ecoPacket/ecoPacketBoxes.services";

const EcoPacketBoxDelete = () => {
    const navigate = useNavigate();
    const { boxId } = useParams<{ boxId: string }>();

    const deleteBox = () => {
        if (boxId) {
            ecoPacketBoxesServices.delete(boxId).then((res: any) => {
                console.log(res);
                alert("Yashik o'chirildi");
                navigate('/boxes');
            })
        }
    }

    return (
        <div>
            <BackLink pathName={`/boxes/${boxId}`} />
            <div style={{
                padding: "20px",
            }}>
                <h2>Yashikni o'chirish</h2>
                <p>Rostan ham ushbu yashikni o'chirmoqchimisiz, bunda siz yashikka tegishli eski ma'lumotlarni ko'ra olmay qolasiz?</p>
                <br />
                <Button sx={{
                    backgroundColor: "red",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "red" }
                }}
                    onClick={deleteBox}
                    variant="contained">
                    O'chirish
                </Button>
            </div>
        </div>
    )
}

export default EcoPacketBoxDelete