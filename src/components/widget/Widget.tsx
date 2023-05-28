import "./widget.scss"
import React from "react";
import { WidgetProps } from "../../types/props.types";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { numberWithCommas } from "../../services/utils";


const Widget = (props: WidgetProps) => {
    const { type } = props

    let icon: React.ReactNode

    switch (type) {
        case "pops":
            icon = (
                <PersonOutlinedIcon
                    className="icon"
                    style={{
                        color: "crimson",
                        backgroundColor: "rgb(255, 0, 0, 0.2)"
                    }}
                />
            )
            break

        case "emps":
            icon = (
                <BalanceOutlinedIcon
                    className="icon"
                    style={{
                        color: "golden",
                        backgroundColor: "rgb(218, 165, 32, 0.2)"
                    }}
                />
            )
            break

        case "earnings":
            icon = (
                <CurrencyExchangeOutlinedIcon
                    className="icon"
                    style={{
                        color: "green",
                        backgroundColor: "rgb(0, 255, 0, 0.2)"
                    }}
                />
            )
            break

        case "orders":
            icon = (
                <ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        color: "purple",
                        backgroundColor: "rgb(128, 0, 128, 0.2)"
                    }}
                />
            )
            break

        default:
            icon = <></>
            break;
    }


    return (
        <div className="widget">
            <div className="left">
                <div className="title">{props.title}</div>
                <div className="counter">{numberWithCommas(props.count)} {type === "earnings" && "so'm"}</div>
                <div className="link">{props.link}</div>
            </div>
            <div className="right">
                {icon}
            </div>
        </div>
    )
}

export default Widget