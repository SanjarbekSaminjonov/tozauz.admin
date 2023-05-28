import "./featured.scss"
import "react-circular-progressbar/dist/styles.css"

import { CircularProgressbar } from "react-circular-progressbar"
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import { numberWithCommas } from "../../services/utils"

type FeaturedProps = {
    data: {
        payed_percentage: number,
        needed_to_pay: number,
        target: {
            payme_request: number,
            payme_payed: number,
            all_payed: number
        }
    }
}

const Featured = ({ data }: FeaturedProps) => {
    return (
        <div className="featured">
            <div className="top">
                <h2 className="title">Oxirgi oy pul so'rovlari va o'tkazmalar</h2>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={data?.payed_percentage || 0}
                        text={`${data?.payed_percentage || 100} %`}
                        strokeWidth={7}
                    />
                </div>
                <p className="title">To'lanishi kerak</p>
                <p className="amout">{numberWithCommas(data?.needed_to_pay)} so'm</p>
                <p className="description">Oxirgi oydagi pul so'rovlari, so'rovlar bo'yicha pul o'tkazmalari va jami pul o'tkazmalari</p>
                <div className="summary">
                    <div className="item">
                        <h4 className="itemTitle">Pul so'rovlari</h4>
                        <div className="resultAmount positive">
                            <KeyboardArrowUpOutlinedIcon className="icon" />
                            {numberWithCommas(data?.target?.payme_request)} so'm
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="itemTitle">So'rov bo'yicha to'langan</h4>
                        <div className="resultAmount negative">
                            <KeyboardArrowDownOutlinedIcon className="icon" />
                            {numberWithCommas(data?.target?.payme_payed)} so'm
                        </div>
                    </div>
                    <div className="item">
                        <h4 className="itemTitle">Jami to'langan</h4>
                        <div className="resultAmount negative">
                            <KeyboardArrowDownOutlinedIcon className="icon" />
                            {numberWithCommas(data?.target?.all_payed)} so'm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured