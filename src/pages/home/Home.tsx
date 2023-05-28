import "./home.scss"

import { useEffect, useState } from "react"

import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import bankAccount from "../../services/bank/bankAccount"
import { Link } from "react-router-dom"

const Home = () => {
    const [data, setData] = useState<any>([])
    useEffect(() => {
        bankAccount.getDashboard().then((res) => {
            setData(res.data)
        })
    }, [])

    return (
        <div className="home">
            <div className="widgets">
                <Widget
                    title="Foydalanuvchilar"
                    count={data?.header_cards?.pops || 0}
                    type="pops"
                    link={<Link to="/users">Barcha foydalanuvchilar</Link>}
                />
                <Widget
                    title="Hodimlar"
                    count={data?.header_cards?.emps || 0}
                    type="emps"
                    link={<Link to="/users">Barcha hodimlar</Link>}
                />
                <Widget
                    title="Daromadlar"
                    count={data?.header_cards?.earnings || 0}
                    type="earnings"
                    link={<Link to="/earnings/emp">Barcha daromadlar</Link>}
                />
                <Widget
                    title="To'layotgan yashiklar"
                    count={data?.header_cards?.orders || 0}
                    type="orders"
                    link={<Link to="/boxes">Barcha buyurtmalar</Link>}
                />
            </div>
            <div className="charts">
                <Featured data={data?.featured} />
                <Chart data={data?.chart_data} />
            </div>
        </div>
    )
}

export default Home
